import commonAPI from "./commonAPI";
import SERVER_URL from "./serverURL";

// registerAPI called by auth component when user clicked on register button 

export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)

}

// loginAPI called by auth component when user clicked on register button 

export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)

}


// addcraftAPI called by add component when user clicked on add button 

export const addcraftAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-craft`,reqBody,reqHeader)

}

// getHomeCraftAPI called by home component when page loaded in browser(useEffect)

export const getHomeCraftAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-craft`,{})

}

// allCraftAPI called by craft component when page loaded in browser(useEffect)

export const allCraftAPI = async (searchkey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-Craft?search=${searchkey}`,{},reqHeader)

}

// userCraftAPI called by view component when page loaded in browser(useEffect)

export const userCraftAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-craft`,{},reqHeader)

}

// updateCraftAPI called by edit component when user clicked on update button 

export const updateCraftAPI = async (id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/crafts/${id}/edit`,reqBody,reqHeader)

}

// userCraftRemoveAPI called by view component when user clicked on delete button - (/crafts/id/remove)

export const userCraftRemoveAPI = async (id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/crafts/${id}/remove`,{},reqHeader)

}

// updateProfileAPI called by profile component when user clicked on update button - (/crafts/id/remove)

export const updateProfileAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)

} 