import React from 'react'
import Image from 'next/image'
import HeroSection from './herocards/HeroSection'
import Footer from './components/Footer'
import Link from 'next/link'



const Home = () => {
  return (
    <div className='flex w-full text-gray-700 items-center justify-center flex-col'>
      <div className='flex w-full items-center justify-center flex-col lg:grid lg:grid-cols-2 lg:gap-3'>
        <div className='flex p-5 flex-col items-center min-w-full'>
          <h1 className='text-4xl  lg:text-5xl font-bold flex w-full dark:text-white'>
            <span className='dark:text-[#59ffb1cc] text-[rgba(8,185,103,0.8)] mr-2'>Track</span> your habits
          </h1>
          <h1 className='text-4xl mt-2 lg:text-5xl font-bold flex w-full dark:text-white'>
            Improve your <span className='dark:text-[#59ffb1cc] text-[rgba(8,185,103,0.8)] ml-2'>Life</span>
          </h1>
           <h1 className=' mt-2 hidden md:flex  lg:text-4xl font-bold w-full dark:text-white'>
            Own your Day
          </h1>
          <p className='text-[13px] flex w-full mt-4 dark:text-gray-300'>
            Because the smallest daily actions shape the strongest futures. Stay consistent. Stay accountable. Stay growing.
          </p>
          <div className='w-full items-center hidden md:flex gap-5 mt-4'>
            <Link href='/auth/signup' className='px-5 py-2 w-30 bg-[rgba(8,185,103,0.8)] text-white rounded-md font-medium cursor-pointer hover:bg-[#59ffb1cc]/90 transition duration-300'>
              Sign Up
            </Link>
            <Link href='/auth/login' className='px-5 w-50 py-2 border border-[rgba(8,185,103,0.8)] dark:border-white dark:text-white rounded-md font-medium cursor-pointer bg-[#59ffb1cc]/10 dark:bg-inherit transition duration-300'>
              Log in
            </Link>
          </div>
        </div>
        <div className='flex w-full items-center justify-center p-5'>
          <Image
            src='/hero.png'
            alt='hero'
            width={300}
            height={300}
            className='w-110 block dark:hidden h-auto object-cover'
          />
          <Image
            src='/dark-hero.jpg'
            alt='hero-dark'
            width={200}
            height={200}
            className='w-110 hidden dark:block h-auto rounded-xl object-cover'
          />
        </div>
        <div className='w-full items-center flex md:hidden p-5 justify-between gap-5 mt-4'>
            <Link href='/auth/signup' className='px-5 py-2 w-30 bg-[rgba(8,185,103,0.8)] text-white rounded-md font-medium cursor-pointer hover:bg-[#59ffb1cc]/90 transition duration-300'>
              Sign Up
            </Link>
            <Link href='/auth/login' className='px-5 w-50 py-2 border border-[rgba(8,185,103,0.8)] dark:border-white dark:text-white rounded-md font-medium cursor-pointer bg-[#59ffb1cc]/10 dark:bg-inherit transition duration-300'>
              Log in
            </Link>
          </div>
      </div>
      <div className='flex w-full items-center justify-center'>
        <HeroSection />
      </div>
      <Footer />
    </div>
  )
}

export default Home