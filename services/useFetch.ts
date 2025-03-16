import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // executes the passed fetch function and handles states (loading, error, result data) accordingly
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();

      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An error occurred: ' + e));
    } finally {
      setLoading(false);
    }
  };

  // resets all states
  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  // if not set by the executing component otherwise the passed fetch function will be executed automatically on component render
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, fetchData, reset };
}

export default useFetch;