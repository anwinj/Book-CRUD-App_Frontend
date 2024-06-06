import React, { useContext, useEffect, useState } from 'react'
import AddBook from './AddBook'
import EditBook from './EditBook'
import { deleteBookAPI, getAllBooksAPI } from '../Services/allAPI'
import { SERVER_URL } from '../Services/serverURL'
import { addBookResponseContext, editBookResponseContext } from '../../Context API/ContextShare'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Content() {

    const [allBooks,setAllBooks] = useState([])

    const {addBookResponse,setAddBookResponse} = useContext(addBookResponseContext)
    const {editBookResponse,setEditBookResponse} = useContext(editBookResponseContext)

    const getAllBooks = async()=>{
        const result = await getAllBooksAPI()
        if(result.status == 200){
            setAllBooks(result.data)
        }
        else{
            console.log(result);
        }
    }

    useEffect(()=>{
        getAllBooks()
    },[addBookResponse,editBookResponse])

    const handleDeleteBook = async (bid)=>{
        try{
            const result = await deleteBookAPI(bid)
            if(result.status==200){
                getAllBooks()
            }
            else{
                toast.warning(result.response.data)
            }
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className='p-4 lg:w-screen'>

        <div className='flex flex-col lg:flex-row justify-between items-center px-2 mt-6'>
            {/* heading */}
            <div>
                <h1 className='text-4xl mb-4'>Unlocking Worlds: The Power of Reading....</h1>
                <p className='text-sm lg:max-w-3xl'>Discover the transformative journey through pages, where every book opens a new universe and every story enriches the soul.</p>
            </div>

            {/* add book button */}
            <AddBook/>
        </div>

        <div className='mt-6 grid grid-cols-1 lg:grid-cols-6 gap-8 p-2'>
            {/* book card */}
            {
                allBooks?.length>0?allBooks.map((book,index)=>(
                    <div key={index} className='flex flex-col items-center'>
                        <img src={`${SERVER_URL}/uploads/${book?.bookImage}`} alt="book image" className='w-52 h-80 lg:w-40 lg:h-60 shadow-[rgba(0,0,15,0.3)_8px_5px_4px_0px]' />
                        <p className='text-lg lg:text-sm mt-4 font-semibold'>{book?.bookName}</p>
                        <p className='lg:text-xs font-light'>{book?.authorName}</p>
                        <div className='w-40 lg:w-24 mt-1 flex justify-between'>
                            <EditBook book={book}/>
                            <button onClick={()=>handleDeleteBook(book?._id)}><i className="fa-solid fa-trash text-red-600"></i></button>
                        </div>
                    </div>
                )):null
            }
            
        </div>
        <ToastContainer autoClose={2500} theme='light' />
    </div>
  )
}

export default Content