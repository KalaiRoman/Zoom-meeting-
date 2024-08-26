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


export const get_Zoom_services_single=async(params)=>{
    try {
        const response=await InstanceUrl.get(`/zoom/meeting/single/${params}`);
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

export const edit_Zoom_services=async(params,data)=>{
    try {
        const response=await InstanceUrl.put(`/zoom/meeting/edit/${params}`,data);
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

export const edit_Zoom_status_services=async(params,data)=>{
    try {
        const response=await InstanceUrl.put(`/zoom/meeting/status/${params}`,data);
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
export const send_Zoom_status_services=async(params)=>{
    try {
        const response=await InstanceUrl.get(`/zoom/meeting/send-mail/${params}`);
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


export const confimr_Zoom_meeting_services=async(data)=>{
    try {
        const response=await InstanceUrl.post(`/zoom/meeting/track-mail/`,data);
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