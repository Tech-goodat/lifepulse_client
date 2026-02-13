"use client"
import React, { useState } from "react"
import Image from 'next/image'
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"


const SignUp = () => {
     const [role, setRole] = useState("user")
  const [phone, setPhone] = useState("")
  return (
    <div className='flex w-full items-center justify-center text-gray-700 dark:text-gray-300'>
        <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3 items-center justify-center'>
            <div className='flex flex-col items-center justify-center p-5'>
                <Image
                    src='/authpic.jpg'
                    alt='signup-hero'
                    width={300}
                    height={300}
                    className='w-110 block rounded-xl h-auto object-cover'
                />
        </div>
        <div className='flex flex-col items-center justify-center p-5'>
            <h1 className='text-xl md:text-2xl flex w-full font-bold mb-2 dark:text-white'>Become Who You Said You’d Be.</h1>
            <p className='text-[13px] mb-2 flex w-full dark:text-gray-300'>
                Because the smallest daily actions shape the strongest futures. Stay consistent. Stay accountable. Stay growing.
            </p>

            <form className='flex flex-col w-full items-center justify-center p-3'>
                <label className='self-start text-[10px] mb-1'>I am registering for</label>
                <div className='flex w-full gap-5 items-center'>
                    <label className='flex p-2 w-30 items-center border border-gray-300 dark:border-gray-500 rounded-md shadow-sm bg-gray-50 dark:bg-inherit gap-2 cursor-pointer'>
                        <input type='radio' name='role' value='user' className=' hidden peer' defaultChecked />
                         <div className="w-3 h-3 rounded-full border border-gray-400 
                  peer-checked:border-gray-500 dark:peer-checked:border-gray-50
                  peer-checked:bg-[rgba(8,185,103,0.8)] 
                  transition-all">
  </div>
                        <span className='text-[10px]'>Myself</span>
                    </label>

                     <label className='flex p-2 w-30 items-center border border-gray-300 dark:border-gray-500 rounded-md shadow-sm  bg-gray-50 dark:bg-inherit gap-2 cursor-pointer'>
                        <input type='radio' name='role' value='other' className=' hidden peer' />
                         <div className="w-3 h-3 rounded-full border border-gray-400 
                  peer-checked:border-gray-500 dark:peer-checked:border-gray-50
                  peer-checked:bg-[rgba(8,185,103,0.8)] 
                  transition-all">
  </div>
                        <span className='text-[10px]'>Other Person</span>
                    </label>
                </div>
                 <label className='self-start text-[10px] mb-1 mt-4'>Your Full Name</label>
                 <input type='text' placeholder='Enter your full name' className='w-full shadow-sm text-[12px] outline-none p-2 border border-gray-300 rounded-md dark:bg-inherit dark:border-gray-500' />
                  <label className='self-start text-[10px] mb-1 mt-4'>Your Email Address</label>
                 <input type='email' placeholder='Enter your email address' className='w-full outline-none shadow-sm text-[12px] p-2 border border-gray-300 rounded-md dark:bg-inherit dark:border-gray-500' />


                 <section className='flex w-full gap-5 items-center justify-between'>
                <div className='flex flex-col'>
                 <label className='self-start text-[10px] mb-1 mt-4'>Your Full Name</label>
                 <input type='text' placeholder='Enter your full name' className='w-full outline-none shadow-sm text-[12px] p-2 border border-gray-300 rounded-md dark:bg-inherit dark:border-gray-500' />
                 </div>
                 <div className='flex flex-col'>
                  <label className='self-start text-[10px] mb-1 mt-4'>Preferred Pseudo Name</label>
                 <input type='text' placeholder='Your pseudo name' className='w-full outline-none shadow-sm text-[12px] p-2 border border-gray-300 rounded-md dark:bg-inherit dark:border-gray-500' />
                 </div>
                 </section>
                 {/* Phone */}
<label className="text-[10px] flex w-full  mb-1 mt-4">
  Phone Number
</label>

<div className="w-full shadow-sm text-[12px] border border-gray-300 rounded-md 
dark:bg-inherit dark:border-gray-500 
focus-within:ring-2 focus-within:ring-[rgba(8,185,103,0.8)] p-0.5 px-2">

  <PhoneInput
    international
    defaultCountry="KE"
    value={phone}
    onChange={setPhone}
    inputComponent={({ ...props }) => (
      <input
        {...props}
        type="tel"
        autoComplete="tel"
        className="w-10 h-8 bg-transparent focus:outline-none"
      />
    )}
  />

</div>
<label className="text-[10px] flex w-full  mb-1 mt-4">
  Phone Number
</label>
<input type='password' placeholder='Enter your password' className='w-full outline-none shadow-sm text-[12px] p-2 border border-gray-300 rounded-md dark:bg-inherit dark:border-gray-500 mt-1' />
                    <button className='w-full mt-5 py-2 bg-[rgba(8,185,103,0.8)] text-[10px] rounded-md font-medium cursor-pointer hover:bg-[#59ffb1cc]/90 transition duration-300'>
                        Create Account
                    </button>
            </form>   
        </div>
    </div>    

    </div>
  )
}

export default SignUp