import { useState, useEffect } from "react";

export const useFetchAPI = (url, options) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        console.log("json", json);
        setData(json.links);
        setIsLoading(false);
      } catch (error) {
        setIsError(error);
      }
    };
    fetchData();
  }, []);
  return { setData, setIsError, setIsLoading, data, isError, isLoading };
};
