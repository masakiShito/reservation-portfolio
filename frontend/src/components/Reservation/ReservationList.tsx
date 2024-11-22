import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Calendar, Clock } from 'lucide-react';

interface Reservation {
  id: number;
  event: {
    id: number;
    name: string;
    description: string;
  };
  schedule: {
    startTime: string;
    endTime: string;
  };
  status: 'confirmed' | 'cancelled';
  reservedAt: string;
}

const mockReservations: Reservation[] = [
  {
    id: 1,
    event: {
      id: 1,
      name: "2024年度 新春コンサート",
      description: "クラシック音楽の名曲をお届けする新春コンサートです。"
    },
    schedule: {
      startTime: "2024-11-23T10:00:00",
      endTime: "2024-11-23T12:00:00"
    },
    status: 'confirmed',
    reservedAt: "2024-11-20T15:30:00"
  },
  {
    id: 2,
    event: {
      id: 2,
      name: "ジャズフェスティバル",
      description: "様々なジャズミュージシャンによる演奏会です。"
    },
    schedule: {
      startTime: "2024-12-15T14:00:00",
      endTime: "2024-12-15T17:00:00"
    },
    status: 'cancelled',
    reservedAt: "2024-11-21T09:15:00"
  }
];

const ReservationList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const handleCancelReservation = async (reservationId: number) => {
    if (window.confirm('予約をキャンセルしてもよろしいですか？')) {
      window.alert('予約をキャンセルしました');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">予約一覧</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'upcoming'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          upcoming 予約
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'past'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          過去の予約
        </button>
      </div>

      <div className="space-y-4">
        {mockReservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white shadow rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{reservation.event.name}</h2>
              <span className={`px-3 py-1 rounded-full text-sm ${
                reservation.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {reservation.status === 'confirmed' ? '予約確定' : 'キャンセル済み'}
              </span>
            </div>

            <div className="space-y-2 text-gray-600 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDateTime(reservation.schedule.startTime)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>
                  {`${formatDateTime(reservation.schedule.startTime)} - ${formatDateTime(reservation.schedule.endTime)}`}
                </span>
              </div>
            </div>

            {reservation.status === 'confirmed' && (
              <div className="flex justify-end">
                <button
                  onClick={() => handleCancelReservation(reservation.id)}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  キャンセルする
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationList;