import React from 'react'

function footer() {
  return (
    <div className='h-15 w-auto m-4 mt-0 bg-purple-300 text-black flex text-[10px] justify-between items-center sm:h-10'>
      <div className='w-[50%] flex justify-center'> Track your daily records and works within just one click, check out my github for more interesting webpages like this.....       <a className='text-blue-800 underline mx-3'  href="https://github.com/krishna31012007">Github</a></div>
      <div className="contacts flex gap-10 w-[50%] justify-around">
        <a className='text-blue-800 underline'  href="mailto:chouhankrishna2007@gmail.com">Email</a>
        <a className='text-blue-800 underline'  href="tel:+919530189353">ContactNo</a>
        <a className='text-blue-800 underline'  href="https://www.linkedin.com/in/krishna-chouhan-7006a3333/">LinkedIn</a>
      </div>
    </div>
  )
}

export default footer
