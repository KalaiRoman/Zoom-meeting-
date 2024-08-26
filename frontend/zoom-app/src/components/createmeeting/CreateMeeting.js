import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ToastError, ToastSuccess } from '../../middleware/ToastModel';
import { CreateZoom_services, edit_Zoom_services, edit_Zoom_status_services, Get_Zoom_services, send_Zoom_status_services,get_Zoom_services_single } from '../../services/Zoom_services';
import moment from 'moment';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Header from '../header/Header';
import { GetZoom_services_user } from '../../services/Zoom_meeting_user_services';
function CreateMeeting() {
  const [id,data]=useSearchParams();
  const history=useNavigate();
    const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false)
    history(`/create-meeting`)

  };
  const handleShow = () => {setShow(true)
    history(`/create-meeting`)
  };
  const [meetings,setMeetings]=useState([]);
  const [inviteuser,setInviteUsers]=useState([]);
  const [selectAll,setSelectAll]=useState(false)
  const [statusChange,setStatusChange]=useState(true)
  const [allusers,setAllusers]=useState([]);

  console.log(inviteuser,'inviteuser')

  const [meeting,setMeeting]=useState({
    name:"",
    Duration:"",
    Users:"",
    MeetingDate:"",
  });
  const {name,Duration,Users,MeetingDate}=meeting;
  const handleChange=(e)=>{
    setMeeting({...meeting,[e.target.name]:e.target.value});
  }
  const CreateMeet=async()=>{
    try {


      if(id.get("id"))
      {
        if(!name || !Duration || !Users || !MeetingDate)
          {
              ToastError("Please Enter All Fileds")
          }
          if(name && Duration  && Users && MeetingDate)
          {
              const datas={
                name,
                Duration,
                Users,
                MeetingDate,
                invitedUsers:inviteuser,
                selectAllStatus:selectAll
              }
              const {data,error}=await edit_Zoom_services(id?.get("id"),datas);
              if(data)
              {
                ToastSuccess("All User Access")
              handleClose();
              GetMethod();
              setMeeting({
                name:"",
                Duration:"",
                Users:"",
                MeetingDate:"",
              })
              }
          }
      }
      else{
        if(!name || !Duration || !Users || !MeetingDate)
          {
              ToastError("Please Enter All Fileds")
          }
          if(name && Duration  && Users && MeetingDate)
          {
              const datas={
                name,
                Duration,
                Users,
                MeetingDate,
                invitedUsers:inviteuser,
                selectAllStatus:selectAll
              }
              const {data,error}=await CreateZoom_services(datas);
              if(data)
              {
                ToastSuccess("Meeting Created")
              handleClose();
              GetMethod();
              setMeeting({
                name:"",
                Duration:"",
                Users:"",
                MeetingDate:"",
              })
              
              }
          }
      }
        
        
    } catch (error) {
        
    }
  }

  const GetMethod=async()=>
  {
    try {
      const {data,error}=await Get_Zoom_services();

if(data)
{
  setMeetings(data)
}
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    GetMethod();
    setMeeting((pre)=>({
      ...pre,
      Users:inviteuser?.length
    })
     
    )
  },[selectAll,inviteuser])

  const JoinMeeting=(params,name)=>{
    history(`/confirm-meeting?roomID=${params}?roomName=${name}`)
  }
const handleChangeSelectall=()=>{
  setSelectAll((pre)=>!pre);

  if(inviteuser?.length===allusers?.length)
  {
    setInviteUsers([]);

  }
  else{
    if(!selectAll)
      {
        const ids=[]
        allusers?.map((item,index)=>{
          ids.push(item?.email);
        })
        setInviteUsers(ids);

      }
      else{
      setInviteUsers([]);

      }
  }
    
}
const handleInviter=(params)=>{
  if(inviteuser?.includes(params?.email))
  {
    const filerData=inviteuser?.filter((item)=>item!==params?.email);
    setInviteUsers(filerData);
  }
  else{
    setInviteUsers([...inviteuser,params?.email]);
  }
}
const edit_Meeting_Data=async(paramsid)=>{
  try {
    const {data}=await get_Zoom_services_single(paramsid);
    if(data)
    {

      setMeeting(data);
      setSelectAll(data?.selectAllStatus);
      setInviteUsers(data?.invitedUsers)
      setStatusChange(data?.status)
      handleShow();
      history(`/create-meeting?id=${paramsid}`)
    }
    
  } catch (error) {
  }
}




useEffect(()=>{

  if(allusers?.length==inviteuser?.length)
  {
    const ids=[]
    allusers?.map((item,index)=>{
      ids.push(item?.email);
    })
    setInviteUsers(ids);
  }
  else{
    setInviteUsers([]);

  }
},[]);


useEffect(()=>{

},[inviteuser])

const handleStatusChange=async(e)=>{
  setStatusChange((pre)=>!pre);
try {
  const update={
    status:statusChange
  }
  const {data}=await edit_Zoom_status_services(e,update);
  if(data)
  {
    GetMethod();
  }

  
} catch (error) {
  
}
}

const sendMail=async(paramsid)=>{
  try {
    const {data}=await send_Zoom_status_services(paramsid)
   if(data)
   {
    ToastSuccess("Mail Sended Suucessfully")
   }
  } catch (error) {
   
  }
}


const FechData=async()=>{
  try {
      
      const {data}=await GetZoom_services_user();

      if(data)
      {
          setAllusers(data);
      }
  } catch (error) {
      console.log(error)
  }
}

useEffect(()=>{
  FechData();
},[])

const createUsers=()=>{
  history("/create-users")
}
  return (
    <div>
      <section>
        <Header/>
      </section>
         <div className='table-section'>
           <div className='mb-5 mt-3 justify-content-end text-end gap-4 d-flex'>
           <button className='submit-btn' onClick={createUsers}>+ Add New User</button>
                <button className='submit-btn' onClick={handleShow}>+ Create Meeting</button>
            </div>
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Meeting Name</th>
          {/* <th>Day</th> */}
          <th>Meeting Date</th>
          <th>Users</th>
          <th>Duration</th>
          <th>Actions</th>
          <th>Meeting Cancel</th>
          <th>Send</th>
          <th>Status</th>

        </tr>
      </thead>
      <tbody>

        {meetings?.map((item,index)=>{
          return(
            <tr key={index}>
          <td>{index+1}</td>
          <td>{item?.name}</td>
          {/* <td>{moment(item?.MeetingDate).format('dddd')}</td> */}
          <td>{moment(item?.MeetingDate).format('LLLL')}</td>
          <td>{item?.Users}</td>

          {/* <td>
{moment(item?.MeetingDate).isSame(moment(), 'day') ? "Join Now" : (
  moment(item?.MeetingDate).isBefore(moment(), 'day') ? "Ended" : "Upcoming"
)}
          </td> */}
          <td>{item?.Duration} Mins</td>
          <td><div className='d-flex gap-4'>
            <div onClick={()=>edit_Meeting_Data(item?._id)}><i className="fa-regular fa-pen-to-square"></i></div>
            <div>
            <i className="fa-solid fa-trash"></i>
            </div>

            </div></td>
          <td>
          <div className="checkbox-wrapper-7 d-flex align-items-center justify-content-center">
  <input className="tgl tgl-ios" id="cb2-7" type="checkbox" onChange={()=>handleStatusChange(item?._id)} checked={item?.status?true:false}/>
  <label className="tgl-btn" for="cb2-7"/>
</div>
          </td>
          <td>
          <button className='cancel-btn' onClick={()=>sendMail(item?._id)}>Send</button>
          </td>
          <td>
        <div className='d-flex align-items-center justify-content-center'>
        {moment(item?.MeetingDate).isSame(moment(), 'day') ? <>
            <button className='submit-btn' onClick={()=>JoinMeeting(item?.MeetingId,item?.name)}>Join</button>
          </> : (
  moment(item?.MeetingDate).isBefore(moment(), 'day') ? "Ended" : "Upcoming"
)}
        </div>
          </td>
        </tr>
          )
        })}
        
        
        
       
       
      </tbody>
    </Table>
         </div>

         <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
            <Row>
                <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Meeting Name"
        name="name"
        value={name}
        onChange={handleChange}
        />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Duration Time</Form.Label>
        <Form.Control type="number" placeholder="Enter Meeting Duration Time"
         name="Duration"
         value={Duration}
         onChange={handleChange}
        />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
                </Col>
            </Row>
            <Row>
               
                <Col>

                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Meeting Date</Form.Label>
        <Form.Control type="Date" placeholder="Enter Meeting Start Date"
           name="MeetingDate"
           value={MeetingDate}
           onChange={handleChange}
        />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
              
                </Col>

                <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User</Form.Label>
        <Form.Control type="Number" placeholder="Enter Meeting Users"
           name="Users"
           value={Users}
           onChange={handleChange}
           disabled
        />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
              </Col>
            </Row>
            <Row>
              <div>
                <input type="checkbox" onChange={handleChangeSelectall} checked={allusers?.length===inviteuser?.length?true:false}/>
                <label>Select All</label>
              </div>
              {allusers?.map((item,index)=>{
                return(
                  <div key={index} className='col-lg-3 d-flex gap-1' onClick={()=>handleInviter(item)} >
                    {inviteuser?.includes(item?.email)?<>
                    <input type="checkbox" checked={true} id={index+1}/>
                    </>:<>
                    <input type="checkbox" id={index+1}/>
                    
                    </>}
                  
                  <div className='mt-1'>
                  <label htmlFor={index+1}>{item.email}</label>
                  </div>

                  </div>
                )
              })}
              
            </Row>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='submit-btn' onClick={handleClose}>
            Cancel
          </button>
          <button className='submit-btn' onClick={CreateMeet}>
            {id?.get("id")?"Update":"Create"}
            </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateMeeting