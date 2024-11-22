import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { Event, EventSchedule, ReservationRequest } from '@/types/event';

const ReservationForm: React.FC = () => {
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // サンプルデータ
  const event: Event = {
    id: 1,
    name: "サンプルイベント",
    description: "イベントの説明文がここに入ります。",
    document_id: "doc123",
    event_id: 123,
    categories: [{ id: 1, name: "category1", description:"詳細1" }, { id: 2, name: "category2", description:"詳細2" }],
    events_categorie_lnk: [],
    events_event_schedule_lnk: [],
    event_schedules: [
      { id: 1, start_time: "2024-11-23T10:00:00", end_time: "2024-11-23T12:00:00", capacity: 20 },
      { id: 2, start_time: "2024-11-23T14:00:00", end_time: "2024-11-23T16:00:00", capacity: 20 },
      { id: 3, start_time: "2024-11-24T10:00:00", end_time: "2024-11-24T12:00:00", capacity: 20 }
    ]
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!selectedSchedule) {
      setError('日時を選択してください');
      return;
    }

    setIsSubmitting(true);
    try {
      const requestBody: ReservationRequest = {
        eventId: event.id,
        scheduleId: selectedSchedule
      };

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('予約の作成に失敗しました');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '予約の作成に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">{event.name}</h1>
        <p className="text-gray-600 mb-4">{event.description}</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">予約可能な日時</h2>
          <div className="space-y-3">
            {event.event_schedules.map((schedule: EventSchedule) => (
              <label
                key={schedule.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                  selectedSchedule === schedule.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="schedule"
                  value={schedule.id}
                  checked={selectedSchedule === schedule.id}
                  onChange={() => setSelectedSchedule(schedule.id)}
                  className="mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Calendar className="w-4 h-4" />
                    <span>{typeof schedule.start_time === 'string' ? formatDateTime(schedule.start_time) : 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 text-sm mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{typeof schedule.start_time === 'string' && typeof schedule.end_time === 'string' ? `${formatDateTime(schedule.start_time)} - ${formatDateTime(schedule.end_time)}` : 'N/A'}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    残り{schedule.capacity}席
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !selectedSchedule}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '予約中...' : '予約する'}
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;