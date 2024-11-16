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

// BigIntを通常の数値に変換する関数
const serialize = (obj: any): any => {
  if (obj == null) return obj; // null または undefined の場合
  if (typeof obj === 'bigint') return Number(obj); // BigIntを数値に変換
  if (Array.isArray(obj)) return obj.map(serialize); // 配列の場合、各要素をシリアライズ
  if (typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, serialize(value)])
    );
  }
  return obj; // その他の場合そのまま返す
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
      ...event,
      description: '',
      event_schedules: event.events_event_schedule_lnk
        .filter(link => link.event_schedules !== null)
        .map(link => ({
          ...link.event_schedules,
          capacity: link.event_schedules ? Number(link.event_schedules.capacity || 0) : 0,
        })),
      categories: event.events_categorie_lnk?.map(link => link.categories) || [],
    })));

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
