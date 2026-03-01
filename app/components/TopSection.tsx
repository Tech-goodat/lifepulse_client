'use client'
import React from 'react'
import Image from 'next/image'



const TopSection = () => {
 

  return (
    <div className="flex  w-full items-center justify-center ">
        <div className='flex w-240 rounded-md px-8 mt-3 items-center bg-gray-100 dark:bg-[#212121] justify-between'>
      <h2 className="text-xl font-semibold">Dashboard </h2>
      <Image  src='/hero.png'
            alt='hero'
            width={50}
            height={50}
            className='w-15 block p-2 h-auto object-cover' />

        </div>
      
    </div>
  )
}

export default TopSection