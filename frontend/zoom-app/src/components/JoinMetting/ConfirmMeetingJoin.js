import React,{useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GetZoom_services_track_user } from '../../services/Zoom_meeting_user_services';
function ConfirmMeetingJoin() {


  const tokencheck=localStorage.getItem("zoom_token");

  const history=useNavigate();
const [id,setParams]=useSearchParams();
  const [show, setShow] = useState(!false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ConfirmMeeting=async()=>{
    try {
      const joinMeetingUser={
        meetingId:id.get("meetingId"),type:"JoinMeeting"
      }
      const {data}=await GetZoom_services_track_user(joinMeetingUser);
      if(data)
      {

        console.log(data,"data");
window.location.replace(data);
handleClose();
      }
    } catch (error) {
      
    }
  }


  const RejectMeeting=async()=>{
    try {
      const joinMeetingUser={
        meetingId:id.get("meetingId"),type:"RejectMeeting"
      }
      const {data}=await GetZoom_services_track_user(joinMeetingUser);
      if(data)
      {
        window.location.assign("/");
        localStorage.removeItem("zoom_token")
handleClose();
      }
    } catch (error) {
      
    }
  }
  const LoginUser=()=>{
    window.location.assign("/");
    localStorage.setItem("path_zoom_meeting",JSON.stringify(window.location.pathname+window.location.search))
  }

  useEffect(()=>{
if(tokencheck)
{
  handleShow();
}
else{
  LoginUser();
}
  },[tokencheck])

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Join Meeting Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div>

          {tokencheck?<>
            <div className='text-center fw-bold fs-4 mb-5 mt-4'>
          Are you sure you want to join the meeting?
          </div>
          <div className='d-flex gap-4 mx-auto align-items-center justify-content-center'>
            <button className='cancel-btns' onClick={RejectMeeting}>Cancel</button>
            <button className='submit-btn' onClick={ConfirmMeeting}>Join Now</button>
          </div>
          </>:<>
          
         

          <div className='text-center fw-bold fs-4 mb-5 mt-4'>
            Please log in and continue the meeting.
          </div>
          <div className='d-flex gap-4 mx-auto align-items-center justify-content-center'>
            <button className='submit-btn' onClick={LoginUser}>Login</button>
          </div>
          </>}
         
         </div>
        </Modal.Body>
        
      </Modal>
    </div>
  )
}

export default ConfirmMeetingJoin