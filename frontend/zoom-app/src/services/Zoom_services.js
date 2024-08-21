import InstanceUrl from "../config/AxiosIntance"

export const CreateZoom_services=async(data)=>{
    try {
        const response=await InstanceUrl.post("/zoom/meeting/create",data);
        if(response)
        {
            return{
                data:response,
                error:"No Data Found"
            }
        }
    } catch (error) {
        return{
            data:"",
            error:error?.response?.data?.message
        }
    }
}

export const Get_Zoom_services=async()=>{
    try {
        const response=await InstanceUrl.get("/zoom/meeting/get");
        if(response)
        {
            return{
                data:response?.data?.data,
                error:"No Data Found"
            }
        }
    } catch (error) {
        return{
            data:"",
            error:error?.response?.data?.message
        }
    }
}