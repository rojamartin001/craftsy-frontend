import React, { createContext } from 'react'
import { useState } from 'react'

export const addCraftResponseContext = createContext()
export const editCraftResponseContext = createContext()
export const profilePicContext = createContext();


const ContextApi = ({children}) => {
    const [addCraftResponse,setAddCraftResponse]= useState("")
    const [editCraftResponse,setEditCraftResponse]= useState("")
    const [profilePic, setProfilePic] = useState("");
  return (
       <profilePicContext.Provider value={{ profilePic, setProfilePic }}>   
   <editCraftResponseContext.Provider value={{editCraftResponse,setEditCraftResponse}}>
      <addCraftResponseContext.Provider value={{addCraftResponse,setAddCraftResponse}}>
          {children}
      </addCraftResponseContext.Provider>
   </editCraftResponseContext.Provider>
   </profilePicContext.Provider>
   
  )
}

export default ContextApi 