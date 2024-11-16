import React from 'react';
import { Clock } from 'lucide-react';
import { Reservation } from '@/types/dashboard';

interface RecentReservationsProps {
  reservations: Reservation[];
}

export function RecentReservations({ reservations }: RecentReservationsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          最近の予約
        </h2>
      </div>
      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="group p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-800">予約 #{reservation.id}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(reservation.reservedAt).toLocaleString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium
                ${reservation.status === '予約済み'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'}`}>
                {reservation.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}