import React from 'react';
import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';

export function Footer() {
  const footerNavigation = {
    main: [
      { name: 'ホーム', href: '/' },
      { name: '予約について', href: '/about' },
      { name: 'よくある質問', href: '/faq' },
      { name: 'お問い合わせ', href: '/contact' },
      { name: 'プライバシーポリシー', href: '/privacy' },
      { name: '利用規約', href: '/terms' },
    ],
    social: [
      {
        name: 'GitHub',
        href: 'https://github.com',
        icon: Github,
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com',
        icon: Twitter,
      },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ロゴと説明 */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                R
              </div>
              <span>予約システム</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              簡単に予約管理ができるシステムです。
              イベントの検索から予約まで、スムーズに行えます。
            </p>
          </div>

          {/* リンク */}
          <div className="grid grid-cols-2 gap-8 col-span-1 md:col-span-2">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                サービス
              </h3>
              <ul className="mt-4 space-y-3">
                {footerNavigation.main.slice(0, 3).map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                サポート
              </h3>
              <ul className="mt-4 space-y-3">
                {footerNavigation.main.slice(3).map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ソーシャルリンクとニュースレター */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              ニュースレター
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              最新のイベント情報をお届けします。
            </p>
            <form className="mt-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="メールアドレス"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  登録
                </button>
              </div>
            </form>
            <div className="flex gap-4 mt-6">
              {footerNavigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-600 text-center">
            &copy; {new Date().getFullYear()} 予約システム. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}