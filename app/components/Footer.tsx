import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white p-4 text-center">
        <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
        <p>Email: contact@lifepulse.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        
        <p>&copy; {new Date().getFullYear()} LifePulse. All rights reserved.</p>
    </div>

  )
}

export default Footer