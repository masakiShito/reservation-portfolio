// components/event/SearchFilter.tsx
import { Search } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';
import type { Category } from '@/types/category';

type SearchFilterProps = {
  onSearch: (keyword: string) => void;
  onCategoryChange: (category: string) => void;
  currentKeyword: string;
  currentCategory: string;
};

const SearchFilter = ({
                        onSearch,
                        onCategoryChange,
                        currentKeyword,
                        currentCategory
                      }: SearchFilterProps) => {
  const [searchTerm, setSearchTerm] = useState(currentKeyword);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('カテゴリーの取得に失敗しました');
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('カテゴリーの読み込みに失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setSearchTerm(currentKeyword);
  }, [currentKeyword]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <div className="flex-1 mb-4 md:mb-0">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="イベントを検索..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </form>
        </div>

        <div className="flex-shrink-0">
          {error ? (
            <div className="text-red-500 text-sm">{error}</div>
          ) : (
            <select
              value={currentCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              <option value="">すべてのカテゴリー</option>
              {categories.map(category => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name || 'カテゴリー名なし'}
                </option>
              ))}
            </select>
          )}
          {isLoading && (
            <div className="text-sm text-gray-500 mt-1">
              カテゴリーを読み込み中...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;