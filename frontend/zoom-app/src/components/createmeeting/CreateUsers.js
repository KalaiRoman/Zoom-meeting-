import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import Modal from 'react-bootstrap/Modal';
import { Col, Row, Toast } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastError, ToastSuccess } from '../../middleware/ToastModel';
import { CreateZoom_services_user, GetZoom_services_user,GetZoom_services_single_user,GetZoom_services_update_user,GetZoom_services_delete_user } from '../../services/Zoom_meeting_user_services';
import Table from 'react-bootstrap/Table';

function CreateUsers() {

  const history=useNavigate();
    const [id,setId]=useSearchParams("");
    const [user,setUser]=useState({
        email:""
    })

    const [allusers,setAllusers]=useState([]);

    const {email}=user;

    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false)
history(`/create-users`)

  };
  const handleShow = () => setShow(true);

  const CreateUser=async(e)=>{
    e.preventDefault();

try {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if(!email)
{
    ToastError("Please Enter Email Id");
}

if(id.get("id"))
{
  if(emailRegex.test(email))
    {
if(email)
{

    const {data,error}=await GetZoom_services_update_user(id.get("id"),user);
    if(data)
    {
        ToastSuccess("User Updated Succssfully")
        handleClose();
    }

}
    }
    else{
        ToastError("Please Enter Valid Email")
    }
}
else{
  if(emailRegex.test(email))
    {
if(email)
{

    const {response,error}=await CreateZoom_services_user(user);
    if(response?.status)
    {
        ToastSuccess("User Created Succssfully")
        handleClose();
        FechData();
    }
    else{
ToastError("User Already Exists")
    }
}
    }
    else{
        ToastError("Please Enter Valid Email")
    }
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

  const edit_Meeting_Data=async(paramsid)=>{
try {
  
  const {data}=await GetZoom_services_single_user(paramsid);
  if(data)
  {
    setUser(data);
    handleShow();
    history(`/create-users?id=${paramsid}`)
  }
} catch (error) {
  
}
  }

  const DeleteUser=async(paramsid)=>{
    try {
      const {data}=await GetZoom_services_delete_user(paramsid);

      if(data)
      {
        ToastSuccess("Delete User Successfully");
        FechData();
      }
     
    } catch (error) {
      
    }
  }

  return (
    <div className='container'>
        <section>
            <Header/>
        </section>

        <main>
        <div className='mb-5 mt-3 justify-content-end text-end gap-4 d-flex'>
           <button className='submit-btn' onClick={handleShow}>+ Add New User</button>
            </div>
            <div>
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Email</th>

          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>

        {allusers?.map((item,index)=>{
          return(
            <tr key={index}>
          <td>{index+1}</td>
          <td>{item?.email}</td>
          <td>{item?.status?"Active":"InActive"}</td>
          <td><div className='d-flex gap-4'>
            <div onClick={()=>edit_Meeting_Data(item?._id)}><i className="fa-regular fa-pen-to-square"></i></div>
            <div onClick={()=>DeleteUser(item?._id)}>
            <i className="fa-solid fa-trash"></i>
            </div>
            </div></td>
          
        </tr>
          )
        })}
        
        
        
       
       
      </tbody>
    </Table>
            </div>
        </main>
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
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="Enter Email"
        name="email"
        value={email}
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
          <button className='submit-btn' onClick={CreateUser}>
            {id?.get("id")?"Update":"Create"}
            </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateUsers