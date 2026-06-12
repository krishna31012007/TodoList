import React from 'react'


function Navbar({ setShowOnlyPending }) {
  return (
    <div className='flex justify-between m-2 p-1 bg-purple-800 text-[white] border-yellow-950 rounded-4xl'>
        <div className="logo font-bold text-[18px] px-3">iTask</div>
      <ul className='flex'>
        <li  onClick={() => setShowOnlyPending(false)} className='hover:font-bold px-6 transition-all cursor-pointer'>Home</li>
        <li  onClick={() => setShowOnlyPending(true)} className=' px-6 hover:font-bold hover:px-5 transition-all cursor-pointer'>Your Task</li>
      </ul>
    </div>
  )
}

export default Navbar
