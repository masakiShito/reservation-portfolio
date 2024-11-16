'use client';

import React, { useEffect, useState } from 'react';
import { UserProfile } from '@/components/dashboard/UserProfile';
import { RecentReservations } from '@/components/dashboard/RecentReservations';
import { RecommendedEvents } from '@/components/dashboard/RecommendedEvents';
import { Layout } from '@/components/Layout';
import { DashboardData } from '@/types/dashboard';

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch('/api/dashboard', {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('データの取得に失敗しました');
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center flex-1">
          <div className="text-red-500 bg-red-50 px-6 py-3 rounded-lg shadow-sm border border-red-100">
            <span className="font-medium">エラー:</span> {error}
          </div>
        </div>
      );
    }

    if (!data) {
      return (
        <div className="flex items-center justify-center flex-1">
          <div className="text-gray-500 bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-100">
            データが見つかりません
          </div>
        </div>
      );
    }

    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                最終更新: {new Date().toLocaleString()}
              </span>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                更新
              </button>
            </div>
          </div>

          <div className="mb-8">
            <UserProfile user={data.user} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentReservations reservations={data.reservations} />
            <RecommendedEvents events={data.events} />
          </div>
        </div>
      </div>
    );
  };

  return <Layout>{renderContent()}</Layout>;
}