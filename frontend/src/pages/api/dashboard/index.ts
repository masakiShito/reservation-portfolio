import * as cookie from 'cookie'; // こちらを試す
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Cookie module:', cookie); // parse 関数が含まれていることを確認

    // ヘッダー確認
    console.log('Headers:', req.headers);

    // クッキー解析
    const cookiesHeader = req.headers.cookie;
    if (!cookiesHeader) {
      console.error('No cookies in headers');
      return res.status(401).json({ error: 'No cookies sent with the request' });
    }

    let cookies: { token?: string } = {};    try {
      cookies = cookie.parse(cookiesHeader);
      console.log('Parsed Cookies:', cookies);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error parsing cookies:', err.message);
      } else {
        console.error('Error parsing cookies:', err);
      }
      return res.status(500).json({ error: 'Failed to parse cookies' });
    }

    const token = cookies.token;
    if (!token) {
      console.error('Token not found in cookies');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // トークンを検証
    let decoded;
    try {
      console.log('JWT_SECRET:', process.env.JWT_SECRET);
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-key') as { userId: number };
      console.log('Decoded token:', decoded);
    } catch (err) {
      if (err instanceof Error) {
        console.error('JWT verification failed:', err.message);
      } else {
        console.error('JWT verification failed:', err);
      }
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const userId = decoded.userId;

    // データベースクエリ
    try {
      const user = await prisma.up_users.findUnique({
        where: { id: userId },
        include: {
          up_users_reservation_lnk: {
            include: {
              reservations: true,
            },
          },
        },
      });

      if (!user) {
        console.error('User not found for userId:', userId);
        return res.status(404).json({ error: 'User not found' });
      }

      console.log('User data:', user);

      // ダッシュボードデータを構築
      const dashboardData = {
        user: {
          id: user.id,
          email: user.email ?? '',
          username: user.username ?? '',
          confirmed: user.confirmed ?? false,
          blocked: user.blocked ?? false,
          createdAt: user.created_at?.toISOString() ?? '',
        },
        reservations: user.up_users_reservation_lnk.map(link => ({
          id: link.reservations?.id ?? 0,
          status: link.reservations?.reservation_status ?? '',
          reservedAt: link.reservations?.reserved_at?.toISOString() ?? '',
        })),
        events: [],
        categories: [],
      };

      return res.status(200).json(dashboardData);
    } catch (err) {
      console.error('Database query failed:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
