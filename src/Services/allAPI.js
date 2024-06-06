import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverURL";

// add book API
export const addBookAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-book`,reqBody,reqHeader)
}

// get book API
export const getAllBooksAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/get-books`,"","")
}

// edit book API
export const editBookAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/book/edit/${id}`,reqBody,reqHeader)
}

// delete book API
export const deleteBookAPI = async(id)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/book/delete/${id}`,"","")
}