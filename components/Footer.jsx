import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <div className='bg-indigo-700 text-white px-4 h-12 flex items-center justify-center text-sm md:text-lg'>
      <p>Copyright &copy; {currentYear} Get me a Chai - All rights reserved.</p>
    </div>
  )
}

export default Footer
