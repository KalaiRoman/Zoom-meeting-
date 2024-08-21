import toast from 'react-hot-toast';
export const ToastSuccess=(params)=>{
    return toast.success(params);
}
export const ToastError=(params)=>{
    return toast.error(params);
}