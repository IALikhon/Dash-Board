import { useEffect, useState } from "react";
import { supabase } from "../Supabase-client/Supabase-client";

const useFetch = ( table ) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        let query = supabase
          .from(table)
          .select("*")
          .order("created_at", { ascending: false });

        const { data, error } = await query;

        if (error) {
          throw error();
        }

        if (isMounted) {
          setData(data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [table]);

  return { data, loading, error };
};

export default useFetch;
