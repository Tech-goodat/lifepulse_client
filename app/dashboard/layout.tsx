'use client'
import React, { useState } from "react";
import NavBar from "../components/Navbar";
import { FaBars } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isOpen, setIsOpen]=useState(false)
  const handleToggle=()=>{
    setIsOpen(!isOpen)
  }
  return (
    <div className="flex flex-col min-h-screen">
      <aside className="w-50 hidden lg:flex">
        <NavBar />
      </aside>
      <button onClick={handleToggle} className=" p-3">
        {isOpen ?<IoIosClose size={25}/> : <FaBars /> }
      </button>
      {isOpen && <NavBar />}
      <main className="flex-1 p-8 ">
        {children}
      </main>
    </div>
  );
}