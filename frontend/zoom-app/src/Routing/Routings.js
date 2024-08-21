import React from 'react'
import { Routes,Route } from 'react-router-dom';
import { AllRoutingPath } from './AllRoutingPaths';
import ProtectedRouter from '../middleware/ProtectedRouter';
function Routings() {
  return (
   <>
   <Routes>
   {AllRoutingPath.slice(0,1)?.map((item,index)=>(
    <Route element={item?.component} exact={item?.exact} path={item?.path} key={index}></Route>
   ))}
   <Route element={<ProtectedRouter/>}>
   {AllRoutingPath.slice(1)?.map((item,index)=>(
    <Route element={item?.component} exact={item?.exact} path={item?.path} key={index}></Route>
   ))}
   </Route>
   </Routes>
   </>
  )
}

export default Routings