import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ToastError, ToastSuccess } from '../../middleware/ToastModel';
import { CreateZoom_services, Get_Zoom_services } from '../../services/Zoom_services';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
function CreateMeeting() {

  const history=useNavigate();
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [meetings,setMeetings]=useState([]);

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

        if(!name || !Duration || !Users || !MeetingDate)
        {
            ToastError("Please Enter All Fileds")
        }

        if(name && Duration  && Users && MeetingDate)
        {
            const datas=meeting

            const {data,error}=await CreateZoom_services(datas);

            if(data)
            {
                ToastSuccess("All User Access")
            handleClose();
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
  },[])

  const JoinMeeting=(params)=>{
    history(`/join?roomId=${params}`)
  }

  console.log(meetings,'meetings')
  return (
    <div>
         <div className='table-section'>

            <div className='mb-5 mt-3 flex-end text-end'>
                <button className='submit-btn' onClick={handleShow}>+ Create Meeting</button>
            </div>
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Day</th>
          <th>Meeting Date</th>
          <th>Users</th>
          <th>Status</th>
          <th>Duration</th>

          <th>Actions</th>
          <th>Meeting Cancel</th>
          <th>Send</th>
          <th>Join</th>


        </tr>
      </thead>
      <tbody>

        {meetings?.map((item,index)=>{
          return(
            <tr key={index}>
          <td>{index+1}</td>
          <td>{moment(item?.MeetingDate).format('dddd')}</td>
          <td>{moment(item?.MeetingDate).format('LLLL')}</td>
          <td>{item?.Users}</td>
          <td>{item?.status}</td>
          <td>{item?.Duration} Mins</td>
          <td><div className='d-flex gap-4'>
            <div><i class="fa-regular fa-pen-to-square"></i></div>
            <div>
            <i class="fa-solid fa-trash"></i>
            </div>

            </div></td>
          <td>
          <div class="checkbox-wrapper-7">
  <input class="tgl tgl-ios" id="cb2-7" type="checkbox"/>
  <label class="tgl-btn" for="cb2-7"/>
</div>
          </td>
          <td>
          <button className='cancel-btn'>Send</button>
          </td>
          <td><button className='submit-btn' onClick={()=>JoinMeeting(item?.MeetingId)}>Join</button></td>
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
        />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
              </Col>
            </Row>
           
        </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='submit-btn' onClick={handleClose}>
            Cancel
          </button>
          <button className='submit-btn' onClick={CreateMeet}>Create</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateMeeting