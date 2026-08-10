// src/modules/2-listing/useSearchFilter.js
import { useState, useMemo } from 'react';

export const useSearchFilter = (initialData) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('All');

  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch =
        item.name.toLowerCase().includes(searchLower) ||
        item.food.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower);

      const matchesPrice = priceFilter === 'All' || item.price === priceFilter;

      return matchesSearch && matchesPrice;
    });
  }, [searchTerm, priceFilter, initialData]);

  return {
    searchTerm,
    setSearchTerm,
    priceFilter,
    setPriceFilter,
    filteredData,
  };
};