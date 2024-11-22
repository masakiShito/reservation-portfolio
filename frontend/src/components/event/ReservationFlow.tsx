import React from 'react';
import { useRouter } from 'next/router';
import { mockEvent, mockSelectedSchedule } from '@/mock/mockData';

// 予約確認画面
const ReservationConfirm: React.FC = () => {
  const router = useRouter();
  // モックデータを使用
  const event = mockEvent;
  const selectedSchedule = mockSelectedSchedule;

  const handleConfirm = async () => {
        router.push('/events/1/complete');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">予約内容の確認</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{event.name}</h2>
        <dl className="space-y-4">
          <div>
            <dt className="text-gray-600">日時</dt>
            <dd className="font-medium">{selectedSchedule.start_time ? new Date(selectedSchedule.start_time).toLocaleString('ja-JP') : 'N/A'}</dd>          </div>
          <div>
            <dt className="text-gray-600">定員</dt>
            <dd className="font-medium">{selectedSchedule.capacity}名</dd>
          </div>
          <div>
            <dt className="text-gray-600">概要</dt>
            <dd className="font-medium">{}</dd>
          </div>
        </dl>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => router.back()}
          className="flex-1 px-6 py-3 border border-gray-300 rounded-lg"
        >
          戻る
        </button>
        <button
          onClick={handleConfirm}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          予約を確定する
        </button>
      </div>
    </div>
  );
};

// 予約完了画面
const ReservationComplete: React.FC = () => {
  const router = useRouter();
  // モックデータを使用
  const event = mockEvent;
  const selectedSchedule = mockSelectedSchedule;

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">予約が完了しました</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{event.name}</h2>
        <p className="text-gray-600 mb-4">
          以下の内容で予約を承りました。<br />
          予約内容の確認メールをお送りしましたのでご確認ください。
        </p>
        <dl className="text-left space-y-2">
          <div>
            <dt className="text-gray-600">日時</dt>
            <dd className="font-medium">{selectedSchedule.start_time ? new Date(selectedSchedule.start_time).toLocaleString('ja-JP') : 'N/A'}</dd>          </div>
        </dl>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          予約一覧を確認する
        </button>
        <button
          onClick={() => router.push('/')}
          className="w-full px-6 py-3 border border-gray-300 rounded-lg"
        >
          トップページに戻る
        </button>
      </div>
    </div>
  );
};

export { ReservationConfirm, ReservationComplete };