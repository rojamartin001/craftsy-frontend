import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import uploadImg from '../assets/uploadImg.png'
import { addcraftAPI } from '../services/allAPI';
import { addCraftResponseContext } from '../contexts/ContextApi';



const Add = () => {
  const { addCraftResponse, setAddCraftResponse } = useContext(addCraftResponseContext)
  const [preview, setPreview] = useState("")
  const [craftDetails, setCraftDetails] = useState({ title: "", materials: "", description: "", link: "", category: "", image: "" })
  console.log(craftDetails);
  const [imageFileStatus, setImageFileStatus] = useState(false)
  // imageFileStatus


  useEffect(() => {
    if (craftDetails.image.type == "image/png" || craftDetails.image.type == "image/jpg" || craftDetails.image.type == "image/jpeg") {
      // valid image
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(craftDetails.image))
    } else {
      // invalid image
      setImageFileStatus(false)
      setCraftDetails({ ...craftDetails, image: "" })
      setPreview("")
    }
  }, [craftDetails.image])


  const [show, setShow] = useState(false);

  const handleClose = () => {

    setShow(false);
    setPreview("")
    setImageFileStatus(false)
    setCraftDetails({ title: "", materials: "", description: "", link: "", category: "", image: "" })
  }
  const handleShow = () => setShow(true);

  const handleAddCraft = async () => {
    const { title, materials, description, link, category, image } = craftDetails
    if (title && materials && description && link && category && image) {
      // alert("proceed api call")
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("materials", materials)
      reqBody.append("description", description)
      reqBody.append("link", link)
      reqBody.append("category", category)
      reqBody.append("image", image)
      const token = sessionStorage.getItem('token')
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        // make api call
        try {
          const result = await addcraftAPI(reqBody, reqHeader)
          if (result.status == 200) {
            alert("Project added sucessfully")
            setAddCraftResponse(result)
            handleClose()
          } else {
            alert(result.response.data)
          }
        } catch (err) {
          console.log(err);

        }

      }
    } else {
      alert("please fill the form completely")
    }
  }

  return (
    <>
      <button onClick={handleShow} className='btn btn-danger rounded'>+ Add Craft</button>

      {/* modal */}

      <Modal centered size='lg' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Craft Details!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center'>
            <div className='col-lg-4'>

              <label >
                <input onChange={e => setCraftDetails({ ...craftDetails, image: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                <img
                  height={'200px'} width={'400px'} className='img-fluid' src={preview ? preview : uploadImg} alt="" />
              </label>
              {
                !imageFileStatus && <div className='text-danger fw-bolder my-2'>*Upload Only the following file types (jpeg,jpg,png) here !!</div>
              }
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
          <Button onClick={handleAddCraft} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>


    </>
  )
}

export default Add