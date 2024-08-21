import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate,Outlet } from 'react-router-dom';
function ProtectedRouter() {
    const state=useSelector((state)=>state?.login);
    useEffect(()=>{
    },[state])
  return state?.token || localStorage.getItem("zoom_token")?<Outlet/>:<Navigate to="/"/>
  
}

export default ProtectedRouter