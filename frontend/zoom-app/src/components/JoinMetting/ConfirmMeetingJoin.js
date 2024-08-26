import React,{useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
function ConfirmMeetingJoin() {

  const history=useNavigate();
const [id,setParams]=useSearchParams();
  const [show, setShow] = useState(!false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ConfirmMeeting=async()=>{
    try {
      history(`/confirm-meeting?roomID=${id.get("roomId")}?roomName=${id.get("userId")}`);
    } catch (error) {
      
    }
  }
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
          <div className='text-center fw-bold fs-4 mb-5 mt-4'>
          Are you sure you want to join the meeting?
          </div>
          <div className='d-flex gap-4 mx-auto align-items-center justify-content-center'>
            <button className='cancel-btns'>Cancel</button>
            <button className='submit-btn' onClick={ConfirmMeeting}>Join Now</button>
          </div>
         </div>
        </Modal.Body>
        
      </Modal>
    </div>
  )
}

export default ConfirmMeetingJoin