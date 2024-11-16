// types/category.ts
export type Category = {
  id: number;
  name: string | null;
  description: string | null;  // nullを許可
};

export type CategoryResponse = {
  categories: Category[];
};