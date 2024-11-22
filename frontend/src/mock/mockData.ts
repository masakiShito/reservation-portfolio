// mockData.ts
import type { Event, EventSchedule } from '@/types/event';

export const mockCategories = [
  { id: 1, name: "音楽" },
  { id: 2, name: "スポーツ" },
  { id: 3, name: "映画" },
  { id: 4, name: "演劇" },
  { id: 5, name: "勉強" }
];
export const mockEvent: Event = {
  id: 1,
  name: "2024年度 新春コンサート",
  description: "クラシック音楽の名曲をお届けする新春コンサートです。",
  document_id: "doc123",
  event_id: 123,
  categories: [
    { id: 1, name: "音楽", description: "音楽イベント" },
    { id: 2, name: "スポーツ", description: "スポーツイベント" }
  ],
  events_categorie_lnk: [],
  events_event_schedule_lnk: [],
  event_schedules: [
    {
      id: 1,
      start_time: "2024-11-23T10:00:00",
      end_time: "2024-11-23T12:00:00",
      capacity: 20
    }
  ]
};

export const mockSelectedSchedule: EventSchedule = {
  id: 1,
  start_time: "2024-11-23T10:00:00",
  end_time: "2024-11-23T12:00:00",
  capacity: 20
};