import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import SERVER_URL from '../services/serverURL'
import  profileImg from '../assets/profilepic-demo.png'
import { useContext } from 'react'
import { profilePicContext } from '../contexts/ContextApi'
import { updateProfileAPI } from '../services/allAPI'


const Profile = () => {
    const { profilePic, setProfilePic }=useContext(profilePicContext)
  const [preview,setPreview] = useState("")
  const [existingProfilepic,setExistingProfilepic] = useState("")
  const [userDetails,setUserDetails] = useState({ username:"",email:"",password:"",profilePic:"" })
  const [open,setOpen]= useState(false)

  
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails,username:user.username,email:user.email,password:user.password
      })
        setExistingProfilepic(user.profilePic)
            setProfilePic(user.profilePic);
    }
  
  },[open])

  useEffect(()=>{
    if(userDetails.profilePic){
      setPreview(URL.createObjectURL(userDetails.profilePic))
      setProfilePic(URL.createObjectURL(userDetails.profilePic))
    }else{
      setPreview("")
      setProfilePic("")
     
    }
  },[userDetails.profilePic])

  const handleUpdateProfile = async ()=>{
    const {username,email,password,profilePic} = userDetails
    const reqBody = new FormData()
    preview ? reqBody.append("profilePic",profilePic) : reqBody.append("profilePic",existingProfilepic)
     const token = sessionStorage.getItem('token')
     if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        // make api call
        try{
         const result = await updateProfileAPI(reqBody,reqHeader)
         if(result.status==200){
          alert("User Profilepic updated successfully")
          sessionStorage.setItem("user",JSON.stringify(result.data))
          setOpen(!open)
         }
        }catch(err){
          console.log(err);
          
        }

      }
  }


  return (
    <>
      <div className='d-flex justify-content-evenly'>
        <h3 className='text-danger'>Profile</h3>
        <button   onClick={() => setOpen(!open)} className='btn btn-danger'>
          <i className='fa-solid fa-angle-down'></i>
        </button>

      </div>
      {/* collapse */}

      <Collapse in={open}>
        <div id='example-collapse-text' className="row container-fluid align-items-center justify-content-center shadow p-2 rounded">

          <label className='text-center' >
          <input onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} type="file" style={{display:'none'}} />
                {
                  existingProfilepic==""?
                  <img height={'150px'} width={'150px'} className='rounded-circle' src={preview? preview :profileImg} alt="" />
                  :
                 <img height={'150px'} width={'150px'} className='rounded-circle' src={preview? preview :`${SERVER_URL}/uploads/${existingProfilepic}`} alt="" />
                }

          </label>
          <div className='mb-2 w-100 text-center text-danger'>
             
              {userDetails.username}
          </div>
          <div className='mb-2 w-100 text-center text-danger'>
              {userDetails.email}
          </div>
          <div className='mb-2 w-100 text-center text-danger ' >
             <button onClick={handleUpdateProfile} className='btn btn-danger'>Update Profile Picture</button>
          </div>
         
        </div>
      </Collapse>
    </>
  )
}

export default Profile