import React from 'react'

const Button = () => {
  return (
     <button 
      className="
        relative inline-block m-15px px-30px py-15px 
        text-center text-[18px] tracking-[1px] no-underline 
        text-[#725AC1] bg-transparent cursor-pointer 
        transition-all duration-500 ease-out 
        border-2 border-[#725AC1] rounded-6px 
        shadow-[inset_0_0_0_0_#725AC1]
        
        hover:text-white hover:shadow-[inset_0_-100px_0_0_#725AC1]
        active:scale-95
      "
    >
      Add
    </button>
  )
}

export default Button
