import React from 'react';
import { Award, CalendarDays } from 'lucide-react';
import { Event } from '@/types/dashboard';

interface RecommendedEventsProps {
  events: Event[];
}

export function RecommendedEvents({ events }: RecommendedEventsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-500" />
          おすすめイベント
        </h2>
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="group p-4 rounded-lg bg-gray-50 hover:bg-purple-50 transition-all duration-300"
          >
            <h3 className="font-medium text-gray-800 group-hover:text-purple-700 transition-colors">
              {event.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {event.description}
            </p>
            <div className="flex items-center gap-2 mt-3 text-gray-500">
              <CalendarDays className="w-4 h-4" />
              <span className="text-xs">
                {new Date(event.startTime).toLocaleDateString()} -
                {new Date(event.endTime).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}