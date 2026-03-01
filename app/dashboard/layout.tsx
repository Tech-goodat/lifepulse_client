'use client'
import React, { useState } from "react";
import NavBar from "../components/Navbar";
import { FaBars } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import TopSection from "../components/TopSection";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* MOBILE TOGGLE */}
      <button
        onClick={handleToggle}
        className="lg:hidden p-3"
      >
        {isOpen ? <IoIosClose size={25} /> : <FaBars />}
      </button>

      {/* MOBILE SIDEBAR */}
      {isOpen && (
        <aside className="lg:hidden w-full border-b">
          <NavBar />
        </aside>
      )}

      {/* DESKTOP + CONTENT ROW */}
      <div className="flex flex-1">

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex w-60 border-r">
          <NavBar />
        </aside>

        {/* CONTENT AREA */}
        <div className="flex-1 flex flex-col">
          <TopSection />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>

      </div>
    </div>
  );
}