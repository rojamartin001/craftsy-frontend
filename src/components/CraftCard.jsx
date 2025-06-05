
import React, { useContext, useState } from 'react'
import { Card, Modal } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom';
import SERVER_URL from '../services/serverURL';
import { profilePicContext } from '../contexts/ContextApi';
import  profilePicBlank from '../assets/profileimg-blank.jpg'





const CraftCard = ({ craft }) => {
   const { profilePic } = useContext(profilePicContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const profilePicUrl = craft?.userId?.profilePic
    ? `${SERVER_URL}/uploads/${craft.userId.profilePic}`
    : profilePic || profilePicBlank;
  

  return (
    <>
      <Card onClick={handleShow} className='btn shadow' style={{ width: '26 rem' }}  >
  <Card.Img  style={{ height: '300px', objectFit: 'cover',width:'100%' }} variant="top" src={`${SERVER_URL}/uploads/${craft?.image}`} alt="craft" />
  <Card.Body className='d-flex justify-content-between align-items-center gap-4'>
    <div className='d-flex align-items-center'>
      <img style={{ width: '40px', height: '40px' }} src={profilePicUrl} alt="" className='rounded' />
      <h6 className='ms-2'>{craft?.userId?.username || "Username"}</h6>
    </div>
    <Card.Title>{craft?.title || "Craft Title"}</Card.Title>
  </Card.Body>
</Card>




      {/* view */}


      <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Craft Details!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <img className='img-fluid'   style={{ height: '300px', width: '100%', objectFit: 'cover' }}   src={`${SERVER_URL}/uploads/${craft?.image}`} alt="" />
            </div>
            <div className='col-lg-6'>
              <h3>{craft?.title}</h3>
              <h6 className='fw-bolder'>Materials used: <span className='text-danger'><h6>{craft?.materials}</h6></span></h6>
              <p style={{textAlign:'justify'}}>
                <span className='fw-bolder'><h6 className='fw-bolder'>Description :</h6></span> <h6>{craft?.description}</h6>
              </p>

            </div>

          </div>
          <div className='mt-2 float-start'>
                  <a href={craft?.link} className='btn btn-danger ms-4 ' target='_blank'><i className="fa-brands fa-youtube "></i></a>        
                  
          </div>
        </Modal.Body>

      </Modal>

    {/* ----- <a href="" className='btn btn-secondary ms-4' target='_blank' ><i className="fa-solid fa-video"></i></a> */}


    </>
  )
}

export default CraftCard