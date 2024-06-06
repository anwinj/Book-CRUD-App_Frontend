import React from 'react'
import BookLogo from './../assets/Images/logo.png'

function Sidebar() {
  return (
    <div className='ms-2 me-2 lg:mt-4 lg:mb-4 border-b lg:border-r-2 lg:border-b-0 border-gray-300'>
      <div className='h-full px-3 py-2 flex lg:flex-col justify-between'>
        <img src={BookLogo} alt="logo" className='w-10' />
        <button className='bg-slate-400 rounded-full text-white w-10 h-10'>
        <i className="fa-solid fa-book-open"></i>
        </button>
        <button className='bg-slate-200 rounded-full text-slate-600 w-10 h-10'>
          <i className="fa-solid fa-bars-staggered"></i>
        </button>
      </div>
    </div>
  )
}

export default Sidebar