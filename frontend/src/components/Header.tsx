import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Calendar, User, Bell, LogOut } from 'lucide-react';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigation = [
    { name: 'ダッシュボード', href: '/dashboard', icon: Calendar },
    { name: '予約一覧', href: '/reservations', icon: Calendar },
    { name: 'イベント', href: '/events', icon: Calendar },
  ];

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);

      // セッションクッキーを削除するAPIを呼び出し
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('ログアウトに失敗しました');
      }

      // クライアントサイドのストレージをクリア
      localStorage.clear();
      sessionStorage.clear();

      // ログインページへリダイレクト
      window.location.replace('/login');

    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
      alert('ログアウトに失敗しました。もう一度お試しください。');
    }
  };


  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* ロゴ */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-gray-900"
            >
              <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                R
              </div>
              <span>予約システム</span>
            </Link>
          </div>

          {/* ナビゲーション */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors
                    ${pathname === item.href
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* 右側のアクション */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors relative"
              aria-label="通知"
            >
              <Bell className="w-5 h-5"/>
              {/* 通知バッジの例 */}
              <span
                className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1 -translate-y-1"></span>
            </button>
            <button
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              aria-label="プロフィール"
              onClick={() => router.push('/profile')}
            >
              <User className="w-5 h-5"/>
            </button>
            <div className="h-6 w-px bg-gray-200 mx-2"/>
            <button
              className={`p-2 rounded-lg transition-colors ${
                isLoggingOut
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={handleLogout}
              disabled={isLoggingOut}
              aria-label="ログアウト"
            >
              <LogOut className={`w-5 h-5 ${isLoggingOut ? 'animate-pulse' : ''}`}/>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}