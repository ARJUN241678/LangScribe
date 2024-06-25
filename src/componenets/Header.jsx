import React from 'react'

export default function Header() {
  return (
    <header className='absolute top-0 left-0 w-full flex justify-between p-4'>

    <h1 className='font-bold'>Lang<span className='text-blue-400'>Scribe</span></h1>
    <button>
    
      <p>New <i className="fa-solid fa-plus"></i></p>
      
    </button>
    </header>
  )
}
