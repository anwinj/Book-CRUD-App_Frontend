import React, { createContext, useState } from 'react'

export const addBookResponseContext = createContext()
export const editBookResponseContext = createContext()

function ContextShare({children}) {

    const [addBookResponse,setAddBookResponse] = useState("")
    const [editBookResponse,setEditBookResponse] = useState("")

  return (
    <>
    <addBookResponseContext.Provider value={{addBookResponse,setAddBookResponse}}>
        <editBookResponseContext.Provider value={{editBookResponse,setEditBookResponse}}>
            {children}
        </editBookResponseContext.Provider>
    </addBookResponseContext.Provider> 
    </>
  )
}

export default ContextShare 