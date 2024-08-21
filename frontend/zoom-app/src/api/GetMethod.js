import React, { useState } from 'react'
import InstanceUrl from '../src/config/AxiosIntance';
function GetMethod() {
    const [loading,setLoading]=useState(false);
    const [response,setResponse]=useState(null);
    const [error,setError]=useState(false);
    const FecthGetMethod=async(url,paramsid)=>{
        setLoading(true);
        try {
            const ApiUrl=paramsid?`${url}/${paramsid}`:url;
            const dataResponse=await InstanceUrl.get(ApiUrl);
            if(dataResponse)
            {
                setResponse(dataResponse?.data);
        setLoading(false);

            }
            else{
                setResponse([]);
            }
            
        } catch (error) {
         setError(error || "Something Went Wrong!!")  ;
        setLoading(false);

        }finally{
            setLoading(false);
            setError("");
        setLoading(false);
        }
    }
  return (
   FecthGetMethod,response,loading,error
  )
}

export default GetMethod