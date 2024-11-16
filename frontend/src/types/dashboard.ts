export type User = {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
};

export type Reservation = {
  id: number;
  status: string;
  reservedAt: string;
};

export type Event = {
  id: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
};

export type Category = {
  id: number;
  name: string;
  description: string;
};

export type DashboardData = {
  user: User;
  reservations: Reservation[];
  events: Event[];
  categories: Category[];
};
