// types/event.ts
export type EventSchedule = {
  id: number;
  start_time: string | Date | null;
  end_time: string | Date | null;
  capacity: number;
};

export type EventScheduleLink = {
  event_schedules: EventSchedule;
};

export type EventCategoryLink = {
  category: Category;
};

export type Event = {
  id: number;
  name: string | null;
  document_id: string | null;
  event_id: number | null;
  description: string;
  categories: Category[];
  event_schedules: EventSchedule[];
  events_categorie_lnk: {
    categories: {
      id: number;
      name: string | null;
    } | null;
  }[];
  events_event_schedule_lnk: {
    event_schedules: {
      id: number;
      start_time: Date | null;
      end_time: Date | null;
      capacity: number;
    } | null;
  }[];
};

export type PaginationType = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type SearchParamsType = {
  keyword: string;
  category: string;
  page: number;
};

// types/category.ts
export type Category = {
  id: number;
  name: string | null;
  description: string | null;  // nullを許可
};

export type CategoryResponse = {
  categories: Category[];
};