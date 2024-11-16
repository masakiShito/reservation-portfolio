'use client';

import { useEffect, useState } from 'react';
import EventCard from '@/components/event/EventCard';
import SearchFilter from '@/components/event/SearchFilter';
import { Event, PaginationType, SearchParamsType } from '@/types/event';
import { Layout } from '@/components/Layout';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState<SearchParamsType>({
    keyword: '',
    category: '',
    page: 1,
  });
  const [pagination, setPagination] = useState<PaginationType>({
    total: 0,
    page: 1,
    limit: 9,
    totalPages: 0,
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();

      if (searchParams.keyword) queryParams.append('keyword', searchParams.keyword);
      if (searchParams.category) queryParams.append('category', searchParams.category);
      queryParams.append('page', searchParams.page.toString());

      const response = await fetch(`/api/events?${queryParams}`);
      if (!response.ok) {
        throw new Error('Events fetch failed');
      }

      const data = await response.json();
      setEvents(data.events);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [searchParams]);

  const handleSearch = (keyword: string) => {
    setSearchParams((prev) => ({ ...prev, keyword, page: 1 }));
  };

  const handleCategoryChange = (category: string) => {
    setSearchParams((prev) => ({ ...prev, category, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => ({ ...prev, page: newPage }));
  };

  const handleResetFilters = () => {
    setSearchParams({
      keyword: '',
      category: '',
      page: 1,
    });
  };

  return (
    <Layout>
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">イベント一覧</h1>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
            >
              フィルターをリセット
            </button>
          </div>

          <SearchFilter
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            currentKeyword={searchParams.keyword}
            currentCategory={searchParams.category}
          />

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">イベントが見つかりませんでした</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="flex justify-center space-x-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        searchParams.page === page
                          ? 'bg-blue-600 text-white shadow'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}