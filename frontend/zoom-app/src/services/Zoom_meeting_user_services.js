import InstanceUrl from "../config/AxiosIntance"

export const CreateZoom_services_user=async(data)=>{
    try {
        const response=await InstanceUrl.post("/zoom/meet/create",data);
        if(response)
        {
            return{
                response:response?.data?.data,
                error:""
            }
        }
     
    } catch (error) {
        return{
            response:"",
            error:"No Data Found"
        }
    }
}


export const GetZoom_services_user=async()=>{
    try {
        const response=await InstanceUrl.get("/zoom/meet/get");
        if(response)
        {
            return{
                data:response?.data?.data,
                error:""
            }
        }
     
    } catch (error) {
        return{
            response:"",
            error:"No Data Found"
        }
    }
}

export const GetZoom_services_single_user=async(paramsid)=>{
    try {
        const response=await InstanceUrl.get(`/zoom/meet/get/${paramsid}`);
        if(response)
        {
            return{
                data:response?.data?.data,
                error:""
            }
        }
     
    } catch (error) {
        return{
            response:"",
            error:"No Data Found"
        }
    }
}

export const GetZoom_services_update_user=async(paramsid,data)=>{
    try {
        const response=await InstanceUrl.put(`/zoom/meet/edit/${paramsid}`,data);
        if(response)
        {
            return{
                data:response?.data?.data,
                error:""
            }
        }
     
    } catch (error) {
        return{
            response:"",
            error:"No Data Found"
        }
    }
}



export const GetZoom_services_delete_user=async(paramsid)=>{
    try {
        const response=await InstanceUrl.delete(`/zoom/meet/delete/${paramsid}`);
        if(response)
        {
            return{
                data:response?.data?.data,
                error:""
            }
        }
     
    } catch (error) {
        return{
            response:"",
            error:"No Data Found"
        }
    }
}


export const GetZoom_services_track_user=async(data)=>{
    try {
        const response=await InstanceUrl.post(`/zoom/meeting/track-mail/`,data);
        if(response)
        {
            return{
                data:response?.data?.data,
                error:""
            }
        }
     
    } catch (error) {
        return{
            response:"",
            error:"No Data Found"
        }
    }
}