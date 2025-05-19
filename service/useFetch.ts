// FetchJenisMangrove
// FetchJenisMangroveDetail

import { useEffect, useState } from "react";
import { fetchGetAllJenisMangrove } from "./api";

const useFetch = <T>(fetchFunction: ()=> Promise<T>, autoFetch=true) =>{
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading]= useState(false);
    const [error, setError]= useState<Error | null>(null);


    const fetchData = async ()=>{

        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occured'));
        }finally{
            setLoading(false);
        }
    }

    const reset = ()=>{
        setData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(()=>{
        if(autoFetch){
            fetchData();
        }
    }, []);

    return {data, loading, error, refetch:fetchData, reset}
}

export default useFetch;


// ===================================================================
export const useFetchJenisMangroveDetail = (id: string | number | undefined) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const allData = await fetchGetAllJenisMangrove();
        const filtered = allData.find((item: any) => item.id.toString() === id?.toString());
        setData(filtered);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    if (id) getDetail();
  }, [id]);

  return { data, loading, error };
};
