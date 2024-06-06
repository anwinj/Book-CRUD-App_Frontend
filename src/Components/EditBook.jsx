import React, { useContext, useEffect, useState } from 'react'
import { SERVER_URL } from '../Services/serverURL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editBookAPI } from '../Services/allAPI';
import { editBookResponseContext } from '../../Context API/ContextShare';


function EditBook({book}) {

  const [bookData,setBookData] = useState({
    id:book._id,bookName:book.bookName,authorName:book.authorName,bookImage:""
  })
  const [showModal,setShowModal] = useState(false)
  const [preview,setPreview] = useState("")

  const {editBookResponse,setEditBookResponse} = useContext(editBookResponseContext)

  const handleClose = ()=>{
    setShowModal(false)
    setPreview("")
  }

  const handleOpen = ()=>{
    setShowModal(true)
  }

  useEffect(()=>{
    if(bookData.bookImage){
      setPreview(URL.createObjectURL(bookData.bookImage))
    }
    else{
      setPreview("")
    }
  },[bookData.bookImage])  

  const handleUpdate = async ()=>{
    const {id,bookName,authorName,bookImage} = bookData
    if(!bookName||!authorName){
      toast.warning("Please fill the form completely")
    }
    else{
      // api call - reqBody
      const reqBody = new FormData()
      reqBody.append("bookName",bookName)
      reqBody.append("authorName",authorName)
      preview?reqBody.append("bookImage",bookImage):reqBody.append("BookImage",bookData.bookImage)

      // api call - reqHeader
      const reqHeader = {
        "Content-Type":preview?"multipart/form-data":"application/json"
      }

      // api call
      try{
        const result = await editBookAPI(id,reqBody,reqHeader)
        if(result.status==200){
          toast.success(`${result.data.bookName} updated successfully`)
          setEditBookResponse(result.data)
          handleClose()
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  return (
    <> 
    <button onClick={handleOpen} ><i className="fa-regular fa-pen-to-square"></i></button>

    {
    showModal&&(
    <>
      <div  className="fixed inset-0 z-50 focus:outline-none flex justify-center items-center">
        <div className="relative w-80 lg:w-96">
          <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white focus:outline-none">
            {/* close button */}
            <div className="p-2 relative">
              <button onClick={handleClose} className="absolute right-1 top-1 p-2 text-slate-600 hover:bg-slate-200 "><i className="fa-solid fa-xmark fa-lg"></i></button>
            </div>
            {/* body */}
            <div className="p-8 flex flex-col items-center justify-center">
              <label>
                <img src={preview?preview:`${SERVER_URL}/uploads/${book.bookImage}`} alt="book image upload" className='w-60 mb-5' />  
                <input onChange={(e)=>setBookData({...bookData,bookImage:e.target.files[0]})} type="file" className='hidden' />
              </label>
              <form>
                <input value={bookData.bookName} onChange={(e)=>setBookData({...bookData,bookName:e.target.value})} type="text" className="w-60 lg:w-80 py-2 px-5 mt-4 bg-zinc-100 focus:outline-none rounded-lg" />
                <input value={bookData.authorName} onChange={(e)=>setBookData({...bookData,authorName:e.target.value})} type="text" className="w-60 lg:w-80 py-2 px-5 mt-4 bg-zinc-100 focus:outline-none  rounded-lg" />  
              </form>
              <button onClick={handleUpdate} className="w-60 lg:w-80 py-2 px-3 mt-4 text-white bg-slate-400 rounded-lg">Update Book</button> 
            </div>
          </div>
        </div>
      </div>
      <div  className="opacity-40 fixed inset-0 z-40 bg-black"></div>
    </>
  )}
  </>
  )
}

export default EditBook