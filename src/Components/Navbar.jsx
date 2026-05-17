import React from 'react'
import Logo from './logo'

const Navbar = () => {
  return (
    <header className="flex justify-between bg-blue-400 bg-cover text-white py-3 px-6 rounded-b-xl shadow-lg">
        <Logo/>
      <ul className='flex gap-8 mx-9'>
        <li className='cursor-pointer hover:font-bold transition-all duration-50 text-lg'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-50 text-lg'>Your Tasks</li>


      </ul>
    </header>
  )
}

export default Navbar
