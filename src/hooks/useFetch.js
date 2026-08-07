import { useEffect, useState } from "react";
import { supabase } from "../Supabase-client/Supabase-client";

const useFetch = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try{
                setLoading(true)

                let query = supabase.from("inventory").select("*").order("created_at", {ascending: true})

                const {data, error} = await query

                if(error){
                    throw new error
                }

                if(isMounted){
                    setData(data)
                }
            }catch(err){
                if (isMounted){
                    setError(err.message)
                }
            }finally{
                if(isMounted){
                    setLoading(false)
                }
            }
        }

        fetchData()

        return () => {
            isMounted = false
        }

    },[])

  return {data, loading, error}
}

export default useFetch;
