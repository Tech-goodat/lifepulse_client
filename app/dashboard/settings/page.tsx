'use client'
import React from 'react'
import Image from 'next/image'

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center p-5 gap-4">
      <Image
        src="/tomandjerry.png"
        alt="Coming Soon"
        width={300}
        height={300}
        className="w-60 h-auto object-cover"
      />
      <h2 className="text-xl dark:text-[#59ffb1cc] text-gray-800 text-center">
        Coming Soon! This page is under production.
      </h2>
    </div>
  )
}

export default Settings