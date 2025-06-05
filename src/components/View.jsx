import React, { useEffect, useState , useContext} from 'react'
import Add from './Add'
import Edit from './Edit'
import { userCraftAPI, userCraftRemoveAPI } from '../services/allAPI'
import { addCraftResponseContext, editCraftResponseContext } from '../contexts/ContextApi'


const View = () => {
  const {editCraftResponse,setEditCraftResponse}=useContext(editCraftResponseContext)
 const { addCraftResponse, setAddCraftResponse } = useContext(addCraftResponseContext)
  const [userCrafts, setUserCrafts] = useState([])

  useEffect(() => {
    getUserCrafts()
  },[addCraftResponse,editCraftResponse])

  console.log(userCrafts);


  const getUserCrafts = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }

      try {

        const result = await userCraftAPI(reqHeader)
        console.log(result);
        if (result.status == 200) {
          setUserCrafts(result.data)
        }


      } catch (err) {
        console.log(err);

      }
    }
  }
  
  const deleteCraft = async (id)=>{
         const token = sessionStorage.getItem('token')
      if(token){
         const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        try{
             await userCraftRemoveAPI(id,reqHeader)
             getUserCrafts()
        }catch(err){
          console.log(err);
          
        }
  }
}


  return (
    <>
      <div className='d-flex justify-content-between'>
        <h2 className='text-danger'>All crafts...</h2>
        <div>
          <Add />
        </div>

      </div>

      <div className='allCrafts mt-2'>
        {
          userCrafts?.length > 0 ?
            userCrafts?.map(craft => (
              <div key={craft?._id} className='border rounded p-2 d-flex justify-content-between mb-3'>
                <h3>{craft?.title}</h3>
                <div className='d-flex align-items-center'>
                  <div><Edit craft={craft} /></div>
                  <div className='btn '>
                    <a target='_blank' href={craft?.link}><i className='fa-brands fa-youtube  text-danger '></i></a>
                  </div>
                  <button onClick={()=>deleteCraft(craft?._id)} className='btn text-danger'>
                    <i className='fa-solid fa-trash'></i>
                  </button>

                </div>
              </div>
            ))
            :
            <div className='text-danger fw-bolder'>Not yet uploaded any crafts</div>
        }

      </div>
    </>
  )
}

export default View