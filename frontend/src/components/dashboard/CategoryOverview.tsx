import React from 'react';
import { Category } from '@/types/dashboard';

type CategoryOverviewProps = {
  categories: Category[];
};

export function CategoryOverview({ categories }: CategoryOverviewProps) {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">カテゴリ一覧</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <p>カテゴリ名: {category.name}</p>
            <p>説明: {category.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
