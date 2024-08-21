import InstanceUrl from "../config/AxiosIntance"

export const Login_services=async(datas)=>{

    console.log(datas,"ks")
    try {
        
        const response=await InstanceUrl.post('/auth/zoom/login',datas);
        if(response)
        {
            return{
                data:response?.data?.data,
                token:response?.data?.token,
                
            }
        }
    } catch (error) {
        return{
           error:error?.response?.data?.message
            
        }
    }
}