import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import uploadImg from '../assets/uploadImg.png'
import SERVER_URL from '../services/serverURL';
import { updateCraftAPI } from '../services/allAPI';
import { editCraftResponseContext } from '../contexts/ContextApi';


const Edit = ({ craft }) => {
   const {editCraftResponse,setEditCraftResponse}=useContext(editCraftResponseContext)

  const [preview, setPreview] = useState("")
  const [imageFileStatus, setImageFileStatus] = useState(false)

  const [craftDetails, setCraftDetails] = useState({ id: craft._id, title: craft.title, materials: craft.materials, description: craft.description, link: craft.link, category: craft.category, image: "" })
  console.log(craftDetails);


  const [show, setShow] = useState(false);


  // useEffect(() => {
  //   if (craftDetails.image.type == "image/png" || craftDetails.image.type == "image/jpg" || craftDetails.image.type == "image/jpeg") {
  //     // valid image
  //     setImageFileStatus(true)
  //     setPreview(URL.createObjectURL(craftDetails.image))
  //   } else {
  //     // invalid image
  //     setImageFileStatus(false)
  //     setCraftDetails({ ...craftDetails, image: "" })
  //     setPreview("")
  //   }
  // }, [craftDetails.image])
  useEffect(() => {
  if (craftDetails.image) {
    if (
      craftDetails.image.type === "image/png" ||
      craftDetails.image.type === "image/jpg" ||
      craftDetails.image.type === "image/jpeg"
    ) {
      setImageFileStatus(true);
      setPreview(URL.createObjectURL(craftDetails.image));
    } else {
      setImageFileStatus(false);
      setPreview("");
    }
  } else {
    setImageFileStatus(true); // No new image selected, assume existing one is valid
  }
}, [craftDetails.image]);


  const handleClose = () => {
    setShow(false);
    setCraftDetails({ id: craft._id, title: craft.title, materials: craft.materials, description: craft.description, link: craft.link, category: craft.category, image: "" })
  }
  const handleShow = () => {
    setShow(true);
    setCraftDetails({ id: craft._id, title: craft.title, materials: craft.materials, description: craft.description, link: craft.link, category: craft.category, image: "" })
  }

  const handleUpdatecraft =async () => {
    const { id, title, materials, description, link, category, image } = craftDetails
    if (title && materials && description && link && category) {
      // api call - put- (id, updateDetails)
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("materials", materials)
      reqBody.append("description", description)
      reqBody.append("link", link)
      reqBody.append("category", category)
      preview ? reqBody.append("image", image) : reqBody.append("image",craft.image)
       const token = sessionStorage.getItem('token')
      if(token){
         const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        // api call
        try{
         const result = await updateCraftAPI(id,reqBody,reqHeader)
         if(result.status == 200){
          alert("Craft updated sucessfully")
          handleClose()
          setEditCraftResponse(result)
         }
        }catch(err){
          console.log(err);
          
        }

      }

     
    } else {
      alert("Please fill the form completetly")
    }
  }

  return (
    <>
      <button onClick={handleShow} className='btn text-danger'><i className='fa-solid fa-edit'></i></button>


      {/* Modal */}

      <Modal centered size='lg' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Craft Details!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center'>
            <div className='col-lg-4'>

              <label >
                <input onChange={e => setCraftDetails({ ...craftDetails, image: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                <img
                  height={'200px'} width={'400px'} className='img-fluid d-block mx-auto' src={preview ? preview : `${SERVER_URL}/uploads/${craft.image}`} alt="" />
              </label>
             {craftDetails.image && !imageFileStatus && (
  <div className='text-danger fw-bolder my-2'>
    *Upload only jpeg, jpg, or png files!
  </div>
)}
  {/* {
                !imageFileStatus && <div className='text-danger fw-bolder my-2'>*Upload Only the following file types (jpeg,jpg,png) here !!</div>
              } */}
            </div>
            <div className='col-lg-8 mt-5'>
              <div className='mb-2'>
                <input value={craftDetails.title} onChange={e => setCraftDetails({ ...craftDetails, title: e.target.value })} type="text" placeholder='Craft Title' className='form-control' />
              </div>
              <div className='mb-2'>
                <input value={craftDetails.materials} onChange={e => setCraftDetails({ ...craftDetails, materials: e.target.value })} type="text" placeholder='Materials Used' className='form-control' />
              </div>
              <div className='mb-2'>
                <input value={craftDetails.description} onChange={e => setCraftDetails({ ...craftDetails, description: e.target.value })} type="text" placeholder='Description' className='form-control' />
              </div>
              <div className='mb-2'>
                <input value={craftDetails.link} onChange={e => setCraftDetails({ ...craftDetails, link: e.target.value })} type="text" placeholder='Video Link' className='form-control' />
              </div>
              <div className='mb-2'>

                <select className="form-control text-dark" value={craftDetails.category}
                  onChange={e => setCraftDetails({ ...craftDetails, category: e.target.value })} >
                  <option value="">Select Category</option>
                  <option value="Handmade Art & Crafts">Handmade Art & Crafts</option>
                  <option value="Wearable & Fashion Crafts">Wearable & Fashion Crafts</option>
                  <option value="Home & Decorative DIY">Home & Decorative DIY</option>
                </select>
              </div>

            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdatecraft} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>


    </>



  )
}

export default Edit