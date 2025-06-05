import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Category from '../components/Category'
import { allCraftAPI } from '../services/allAPI'


const Crafts = () => {
  const [searchKey,setSearchKey]=useState("")
  const [allCrafts,setAllCrafts] = useState([])

  console.log(allCrafts);

  useEffect(()=>{
    getAllCrafts()
  },[searchKey])
  

  const getAllCrafts = async ()=>{
    const token = sessionStorage.getItem('token')
    if(token){
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      try{
          const result = await allCraftAPI(searchKey,reqHeader)
         if(result.status==200){
          setAllCrafts(result.data)
         }
      }catch(err){
        console.log(err);
        
      }
    }

  }
 
  return (
    <>
    <Header/>
    <div className='container-fluid ' style={{paddingTop:'150px'}}>
     <div className='d-flex justify-content-between'>

     <h1>All Crafts</h1>
     <input onChange={e=>setSearchKey(e.target.value)} placeholder='search crafts by title ' type="text" className='form-control w-25'/>
     </div>
     {/* categories */}
     <div className='container-fluid' style={{minHeight:'100vh'}}>
      <Category craft={allCrafts} />
     </div>
      
    </div>
    </>
  )
}

export default Crafts