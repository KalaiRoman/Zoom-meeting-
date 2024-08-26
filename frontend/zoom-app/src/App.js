import React, { useEffect, useState } from 'react'
import Routings from './Routing/Routings';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownShow } from './redux/reducers/Login_Reducer';
import Header from './components/header/Header';
function App() {

//   const [show,setShow]=useState(false);
//   const dispatch=useDispatch();

//   const state=useSelector((state)=>state?.login?.dropdownshow);


//   const handleClick=()=>{
//     if(state)
//     {
//       setShow((pre)=>!pre)
//     dispatch(DropdownShow(show));

//     }
    
//   }

//   useEffect(()=>{
// window.addEventListener("click",handleClick)

// return()=>{
//   window.removeEventListener("click",handleClick)
// }

//   },[show,state])

const pathNames=window.location.pathname;

useEffect(()=>{

},[pathNames])
  return (
    <div>

      <section>
        {/* {pathNames=="/"?<></>:<>
          <Header/>
        </>} */}
      </section>
      <main>
      <Routings/>   

      </main>
      <section>

      </section>
  </div>
  )
}

export default App