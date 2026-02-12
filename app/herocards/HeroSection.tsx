import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
  const cards=[
    {
        title:'Build Better Habits',
        description:'Track sleep, water, exercise, and mindfulness daily to form routines that stick.',
        image:'/doc1.png'
    },
    {
        title:'',
        description:'Interactive charts and weekly summaries show your progress clearly.',
        image:'/doc2.png'
    },
    {
        title:'Keep the Momentum',
        description:'Streaks, badges, and achievements make tracking fun and help you stay accountable.',
        image:'/doc3.png'
    },
    {
        title:'Smart Tips, Every Day',
        description:'Get actionable daily tips to improve your routines without guesswork.',
        image:'/doc4.png'
    }
  ]
  return (
    <div className='flex flex-col w-full items-center justify-center'>
        <div className='p-5 flex flex-col' >
            <h1 className='text-[15px] md:text-xl  text-center  font-bold flex w-full dark:text-white'>
                Why You Should Track Your Habits With LifePulse ?
            </h1>
            <div className='flex flex-col md:flex-row w-full items-center justify-between gap-5 mt-10'>
              {cards.map((card, index)=>(
                <div key={index} className='flex flex-col items-center justify-center p-5 gap-3 w-full md:w-full lg:w-60 h-50 bg-gray-100 dark:bg-[#212121] rounded-lg shadow-md'>
                  <Image src={card.image} alt='doctor icon' width={50} height={200}/>
                  <h2 className='text-lg font-semibold flex w-full dark:text-white'>{card.title}</h2>
                  <p className='flex w-full text-[13px] dark:text-gray-300'>{card.description}</p>
                  </div>

              ))}
              </div>

        </div>
    </div>
  )
}

export default HeroSection