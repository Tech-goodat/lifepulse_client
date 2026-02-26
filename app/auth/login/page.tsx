'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaRegEye } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go"
import { useRouter } from 'next/navigation';


const LogIn = () => {
  const router=useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData]=useState({
    email:'',
    password:''
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setUserData(prev => ({
    ...prev,
    [name]: value
  }));
};
  const handlePasswordView = (e:React.MouseEvent<HTMLButtonElement> )=>{
    e.preventDefault();
    setShowPassword(!showPassword)

  
  }
  const HandleLogIn=(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
     fetch('http://127.0.0.1:5555/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(userData)
    })

    .then((res=>{
      if (!res.ok){
        throw new Error('Network response was not ok');
      }
      return res.json()
    }))
    .then((data=>{
      console.log('Success:', data);
      sessionStorage.setItem(
        'token', data.access_token
      )
       router.push('/dashboard')
    }))
    .catch(error=>{console.error('failed to log in', error)})
  }
  return (
    <div className='flex flex-col items-center justify-center dark:text-white text-gray-700 h-screen'>
      <div className='flex flex-col md:grid md:grid-cols-2'>
        <div className='flex flex-col items-center justify-center p-8'>
          <Image
            src='/login.jpg'
            alt='Sign Up'
            width={600}
            height={600}
            className='w-full rounded-xl h-auto'
          />
        </div>
        <div className='flex w-full flex-col items-center justify-center'>
          <h1 className='text-lg font-bold'>Create a <span className='text-[rgba(8,185,103,0.8)]'>LifePulse</span>  Account</h1>
          <p className='text-sm mt-2 text-gray-500 dark:text-gray-300'>Join us and start tracking your habits today!</p>
          <form onSubmit={HandleLogIn} className='flex mt-5 p-3 flex-col items-center justify-center gap-5 w-full'>
            <input name='email' value={userData.email} onChange={handleChange} className='w-full text-sm p-2 border outline-none border-gray-300 rounded-md dark:bg-inherit dark:border-gray-700' type='text' placeholder='your Email' />
            <div className='flex w-full items-center justify-between border border-gray-300 rounded-md dark:border-gray-700 px-2'>
            <input name='password' value={userData.password} onChange={handleChange} className='w-full text-sm p-2  outline-none  dark:bg-inherit' type={showPassword ? "text" : "password"} placeholder='Your Password' />
            <button type='button'  className='text-gray-700 cursor-pointer dark:text-gray-500' onClick={handlePasswordView}>
            {showPassword ? <GoEyeClosed /> : <FaRegEye />}
            </button>
            </div>
            <button type='submit' className='w-full flex justify-center items-center text-sm p-2 bg-[rgba(8,185,103,0.8)] text-white rounded-md font-medium cursor-pointer hover:bg-[#59ffb1cc]/90 transition duration-300'>
              Continue Login
              
            </button>
            <p className='text-sm mt-2 text-gray-500 dark:text-gray-300'>Don't  have an account? <a href='/auth/signup' className='text-[rgba(8,185,103,0.8)] dark:text-[#59ffb1cc] cursor-pointer'>Sign Up</a></p>
          </form>
        </div>
      </div>

    </div>
  )
}

export default LogIn