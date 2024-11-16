// components/event/EventCard.tsx
import { Calendar, Clock, Users } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Event } from '@/types/event';

type EventCardProps = {
  event: Event;
};

const EventCard = ({ event }: EventCardProps) => {
  const firstSchedule = event.events_event_schedule_lnk?.[0]?.event_schedules;

  const formatEventDate = (dateString: string | Date | null) => {
    if (!dateString) return '日付未定';
    try {
      const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
      return format(date, 'yyyy年M月d日', { locale: ja });
    } catch (error) {
      console.error('Invalid date:', dateString);
      return '日付未定';
    }
  };

  const formatEventTime = (dateString: string | Date | null) => {
    if (!dateString) return '--:--';
    try {
      const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
      return format(date, 'HH:mm', { locale: ja });
    } catch (error) {
      console.error('Invalid time:', dateString);
      return '--:--';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{event.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {firstSchedule && (
          <div className="space-y-2">
            <div className="flex items-center text-gray-700">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {formatEventDate(firstSchedule.start_time)}
              </span>
            </div>

            <div className="flex items-center text-gray-700">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {formatEventTime(firstSchedule.start_time)} -
                {formatEventTime(firstSchedule.end_time)}
              </span>
            </div>

            <div className="flex items-center text-gray-700">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">
                定員: {firstSchedule.capacity.toLocaleString('ja-JP')}名
              </span>
            </div>
          </div>
        )}

        <div className="mt-4">
          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
            onClick={() => console.log('イベント詳細へ:', event.id)}
          >
            詳細を見る
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;