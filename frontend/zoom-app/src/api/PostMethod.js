import React, { useState } from 'react';
import InstanceUrl from './../config/AxiosIntance';

function usePostMethod() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const FecthPostMethod = async (url, queryparamsid, data) => {
    setLoading(true);
    setError("");
    console.log(url, queryparamsid, data, "kala");

    try {
      const ApiUrl = queryparamsid ? `${url}/${queryparamsid}` : url;
      const dataResponse = await InstanceUrl.post(ApiUrl, data);

      if (dataResponse) {
        setResponse(dataResponse.data);
      } else {
        setResponse([]);
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { FecthPostMethod, response, loading, error };
}

export default usePostMethod;
