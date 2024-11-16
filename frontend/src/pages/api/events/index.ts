import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Event } from '@/types/event';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

type ResponseData = {
  events: Event[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
} | {
  error: string;
};

const serialize = <T>(obj: T): T => {
  if (obj == null) return obj;
  if (obj instanceof Date) return obj.toISOString() as T;
  if (Array.isArray(obj)) {
    return obj.map(item => serialize(item)) as T;
  }
  if (typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>)
        .map(([key, value]) => [key, serialize(value)])
    ) as T;
  }
  return obj;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req;
  const category = query.category as string;
  const keyword = query.keyword as string;
  const page = parseInt(query.page as string || '1');
  const limit = parseInt(query.limit as string || '9');
  const offset = (page - 1) * limit;

  try {
    // クエリ条件の構築
    const where = {
      AND: [
        {
          published_at: {
            not: null
          }
        },
        // キーワード検索
        ...(keyword ? [{
          OR: [
            {
              name: {
                contains: keyword
              }
            }
          ]
        }] : []),
        // カテゴリフィルター
        ...(category ? [{
          events_categorie_lnk: {
            some: {
              categorie_id: parseInt(category)
            }
          }
        }] : [])
      ]
    };

    console.log('Generated WHERE condition:', JSON.stringify(where, null, 2));

    // イベントの取得
    const [events, total] = await Promise.all([
      prisma.events.findMany({
        where,
        select: {
          id: true,
          name: true,
          document_id: true,
          event_id: true,
          events_event_schedule_lnk: {
            select: {
              event_schedules: {
                select: {
                  id: true,
                  start_time: true,
                  end_time: true,
                  capacity: true,
                },
              },
            },
          },
          // カテゴリの情報を追加
          events_categorie_lnk: {
            select: {
              categories: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        skip: offset,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
      }),
      prisma.events.count({ where }),
    ]);

    console.log('Fetched events:', JSON.stringify(serialize(events), null, 2));
    console.log('Total count:', Number(total));

    const serializedEvents = serialize(events.map(event => ({
      id: event.id,
      name: event.name,
      document_id: event.document_id,
      event_id: event.event_id,
      description: '',
      categories: event.events_categorie_lnk
        .map(link => link.categories)
        .filter((category): category is NonNullable<typeof category> => category !== null),
      event_schedules: event.events_event_schedule_lnk
        .map(link => ({
          id: link.event_schedules?.id ?? 0,
          start_time: link.event_schedules?.start_time ?? null,
          end_time: link.event_schedules?.end_time ?? null,
          capacity: Number(link.event_schedules?.capacity || 0),
        })),
      events_categorie_lnk: event.events_categorie_lnk,
      events_event_schedule_lnk: event.events_event_schedule_lnk
    }))) as Event[];

    return res.status(200).json({
      events: serializedEvents,
      pagination: {
        total: Number(total), // BigIntを変換
        page,
        limit,
        totalPages: Math.ceil(Number(total) / limit),
      },
    });
  } catch (error) {
    console.error('Events fetch error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2)); // エラー詳細を出力
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (process.env.NODE_ENV === 'production') {
      await prisma.$disconnect();
    }
  }
}