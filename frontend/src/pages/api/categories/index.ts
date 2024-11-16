// pages/api/categories/index.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Category } from '@/types/category';

const prisma = new PrismaClient();

type ResponseData = {
  categories: Category[];
} | {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Prismaのクエリを修正
    const rawCategories = await prisma.categories.findMany({
      where: {
        published_at: {
          not: null
        }
      },
      select: {
        id: true,
        name: true,
        // Prismaスキーマに定義されているフィールドのみを選択
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Category型に変換
    const categories: Category[] = rawCategories.map(category => ({
      id: category.id,
      name: category.name,
      description: null // 必要に応じて追加
    }));

    return res.status(200).json({ categories });

  } catch (error) {
    console.error('Categories fetch error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (process.env.NODE_ENV === 'production') {
      await prisma.$disconnect();
    }
  }
}