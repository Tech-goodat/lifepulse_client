import Link from 'next/link'
import React from 'react'
import { FaHome } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

const Navbar = () => {
  return (
    <div className='flex border-r lg:border-gray-50 h-screen p-8 flex-col w-full items-center '>
      <h1 className='flex mb-6 dark:text-[#59ffb1cc] text-[rgba(8,185,103,0.8)] p-1.5 w-full items-center'>LifePulse</h1>
      <div className='flex w-full gap-6 flex-col items-center'>
        <Link className='flex w-full items-center hover:bg-[rgba(88,90,89,0.8)] gap-3 hover:rounded-sm p-1.5' href='/'><FaHome /><span className="text-[13px]">Home</span></Link>
        <Link className='flex w-full items-center hover:bg-[rgba(88,90,89,0.8)] gap-3 hover:rounded-sm p-1.5' href='/'><IoIosAddCircleOutline  /><span className="text-[13px]">Creat Logs</span></Link>
        <Link className='flex w-full items-center hover:bg-[rgba(88,90,89,0.8)] gap-3 hover:rounded-sm p-1.5' href='/'><MdHistory  /><span className="text-[13px]">History</span></Link>
        <Link className='flex w-full items-center hover:bg-[rgba(88,90,89,0.8)] gap-3 hover:rounded-sm p-1.5' href='/'><MdOutlineTipsAndUpdates  /><span className="text-[13px]">Tips</span></Link>
        <Link className='flex mt-40 w-full items-center hover:bg-[rgba(88,90,89,0.8)] gap-3 hover:rounded-sm p-1.5' href='/'><IoIosSettings  /><span className="text-[13px]">Profile Settings</span></Link>
      </div>
    </div>
  )
}

export default Navbar