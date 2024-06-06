import React, { useContext, useEffect, useState } from 'react'
import uploadImg from './../assets/Images/upload.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addBookAPI } from '../Services/allAPI';
import { addBookResponseContext } from '../../Context API/ContextShare';

function AddBook() {

  const [bookData,setBookData] = useState({
    bookName:"",authorName:"",bookImage:""
  })
  const [fileStatus,setFileStatus] = useState(false)
  const [preview,setPreview] = useState("")
  const [showModal,setShowModal] = useState(false)
  
  const {addBookResponse,setAddBookResponse} = useContext(addBookResponseContext)

  const handleClose = ()=>{
    setShowModal(false)
    setBookData({bookName:"",authorName:"",bookImage:""})
    setPreview("")
    setFileStatus(false)
  }

  const handleOpen = ()=>{
    setShowModal(true)
  }

  useEffect(()=>{
    if(bookData.bookImage.type=="image/jpg"||bookData.bookImage.type=="image/jpeg"||bookData.bookImage.type=="image/png"){
      setPreview(URL.createObjectURL(bookData.bookImage))
      setFileStatus(false)
    }
    else{
      setBookData({...bookData,bookImage:""})
      setFileStatus(true)
      setPreview("")
    }
  },[bookData.bookImage])  

  const handleAddBook = async ()=>{
    const {bookName,authorName,bookImage} = bookData
    if(!bookName||!authorName||!bookImage){
      toast.warning("Please fill the form completely")
    }
    else{
      // api call - reqBody
      const reqBody = new FormData()
      reqBody.append("bookName",bookName)
      reqBody.append("authorName",authorName)
      reqBody.append("bookImage",bookImage)

      // api call - reqHeader
      const reqHeader ={
        "Content-Type":"multipart/form-data"
      }

      // api call
      try{
        const result = await addBookAPI(reqBody,reqHeader)
        if(result.status==200){
          // console.log(result.data);
          toast.success(`${result.data.bookName} added succesfully..`)
          setAddBookResponse(result.data)
          handleClose()
        }
        else{
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  return (
    <>
      <button onClick={handleOpen}  className="mt-4 lg:mt-0 bg-slate-400 px-3 py-2 rounded-lg text-white text-sm font-medium"><i className="fa-solid fa-file-circle-plus me-1"></i>Add Book </button>

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
              <div class="p-8 flex flex-col items-center justify-center">
                <label>
                  <img src={preview?preview:uploadImg} alt="book image upload" className='w-60 mb-5' />  
                  <input  onChange={(e)=>setBookData({...bookData,bookImage:e.target.files[0]})} type="file" className='hidden' />
                </label>
                {
                  fileStatus&&
                  <p className='text-sm text-red-600 text-center'>**Only jpeg/jpg/png files allowed</p>
                }
                
                <form>
                  <input onChange={(e)=>setBookData({...bookData,bookName:e.target.value})} type="text" placeholder='Type the book name' className="w-60 lg:w-80 py-2 px-5 mt-4 bg-zinc-100 focus:outline-none placeholder:text-slate-400 placeholder:font-light rounded-lg" />
                  <input  onChange={(e)=>setBookData({...bookData,authorName:e.target.value})} type="text" placeholder='Type the author name' className="w-60 lg:w-80 py-2 px-5 mt-4 bg-zinc-100 focus:outline-none placeholder:text-slate-400 placeholder:font-light rounded-lg" />
                </form> 
                <button onClick={handleAddBook} className="w-60 lg:w-80 py-2 px-3 mt-4 text-white bg-slate-400 rounded-lg">Add Book</button>
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

export default AddBook