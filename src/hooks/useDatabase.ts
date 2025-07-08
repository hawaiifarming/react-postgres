import { useState, useEffect } from 'react';

// Generic hook for database queries
export const useQuery = <T = any>(queryFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await queryFn();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, refetch: () => useEffect(() => {}, []) };
};

// Specific hook for Weekly Budget data
export const useWeeklyBudgetData = () => {
  const [allData, setAllData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { PostgresDataService } = await import('../services/postgresDataService');
        const service = new PostgresDataService();
        const data = await service.loadAllData();
        setAllData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data: allData, loading, error };
};

// General hook for PostgreSQL data
export const usePostgresData = () => {
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initService = async () => {
      try {
        setLoading(true);
        setError(null);
        const { PostgresDataService } = await import('../services/postgresDataService');
        const serviceInstance = new PostgresDataService();
        setService(serviceInstance);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    initService();
  }, []);

  return { service, loading, error };
};
