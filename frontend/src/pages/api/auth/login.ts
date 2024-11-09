// src/pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { email, password } = req.body;

        const user = await prisma.up_users.findFirst({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(401).json({
                message: 'メールアドレスまたはパスワードが正しくありません'
            });
        }

        const isValid = await bcrypt.compare(password, user.password || '');
        if (!isValid) {
            return res.status(401).json({
                message: 'メールアドレスまたはパスワードが正しくありません'
            });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            message: 'サーバーエラーが発生しました'
        });
    }
}