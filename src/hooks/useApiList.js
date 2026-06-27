import { useState, useEffect, useCallback } from "react";

export function useApiList(fetchFn, { searchTerm, currentPage, entriesToShow }) {
  const [data, setData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refetch = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchFn({ search: searchTerm, page: currentPage, limit: entriesToShow });
      setData(res.data || []);
      setTotalEntries(res.meta?.total || 0);
      setTotalPages(res.meta?.totalPages || 0);
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [fetchFn, searchTerm, currentPage, entriesToShow]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const startIndex = totalEntries > 0 ? (currentPage - 1) * entriesToShow : 0;

  return { data, totalEntries, totalPages, loading, error, refetch, startIndex };
}
