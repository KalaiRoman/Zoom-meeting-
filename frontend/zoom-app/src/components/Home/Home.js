import React from 'react'
import './Home.scss';
import Header from '../header/Header';
import { useNavigate } from 'react-router-dom';
function Home() {
  const Cards=[
    {
      id:1,
      name:"Create Meetings",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBs1WsC0WBMJi-5kSVKkUYv1dOoDDxqNPctA&s",
      path:"/create-meeting"
    },
    {
      id:2,
      name:"My Meetings",
      image:"https://img.freepik.com/free-vector/group-video-concept-illustration_114360-4792.jpg",
      path:"/my-meeting"
    }
  ]
  const history=useNavigate();

  const handleMovePath=(params)=>{
    history(params)
  }
  return (
    <div>
     
     <section>
        <Header/>
      </section>
      <section>
        <main className='main-section-body'>
<div className='row gap-5 w-100 mx-auto'>
{Cards?.map((item,index)=>{
  return(
    <div key={index} className='card col-lg-4' onClick={()=>handleMovePath(item?.path)}>
<div>
<img src={item?.image} alt="no image" className='image'/>
</div>
<div className='name'>
  {item?.name}
</div>
    </div>
  )
})}
</div>
        </main>
      </section>
      <section>
        footer
      </section>
    </div>
  )
}

export default Home