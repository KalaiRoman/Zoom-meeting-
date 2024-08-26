import React, { useEffect, useState } from 'react'
import './Header.scss';
import zoomlogo from '../../assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { DropdownShow, LogoutUser } from '../../redux/reducers/Login_Reducer';
function Header() {
    const [show,setShow]=useState(false);
    const dispatch=useDispatch();
    const state=useSelector((state)=>state?.login?.dropdownshow);
    const hanldeClick=()=>{
        setShow((pre)=>!pre);
        dispatch(DropdownShow(show));
    }

    useEffect(()=>{

    },[show]);

    const profileList=["Profile","Meetings"];

    const clerLocal=()=>{
        dispatch(LogoutUser());;
        window.location.assign("/")
    }
  return (
    <div className='main-header'>
        <div>
<img src={zoomlogo} alt="no image" className='logo'/>
        </div>
        <div>
        </div>
        <div>
            <div className='profile-dropdown' onClick={hanldeClick}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s"
                className='image-profile'
                />
            </div>
            <div>
                {state?<div className='show-dropdown'>
                <div>
{profileList?.map((item,index)=>{
    return(
        <div key={index}>
{item}
        </div>
    )
})}
</div>
<div>
<button className="submit-btn" onClick={clerLocal}>Logout</button>
    </div>
            </div>:<></>}
            </div>

        </div>
    </div>
  )
}

export default Header