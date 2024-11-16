import React from 'react';
import { User } from '@/types/dashboard';

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          プロフィール
        </h2>
      </div>
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="flex-grow">
          <div className="mb-4">
            <h3 className="font-medium text-gray-800">{user.username}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-gray-50">
              <p className="text-xs text-gray-500 mb-1">アカウント状態</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${user.confirmed
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'}`}>
                {user.confirmed ? '確認済み' : '未確認'}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
              <p className="text-xs text-gray-500 mb-1">登録日</p>
              <p className="text-sm font-medium text-gray-800">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}