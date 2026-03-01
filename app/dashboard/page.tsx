'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Link from 'next/link'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface User {
  id: number
  username: string
  email: string
}
interface Log {
  id: number
  average_sleep: string
  hashtag: string
  total_water_taken: number
  total_exersise_time: number
  total_meditation_time: number
  low_moments: string
  quote_of_the_day: string
}

const Home = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [date, setDate] = useState<Date>(new Date())
  const [userLogs, setUserLogs] = useState<Log[]>([])

  const [avgSleep, setAvgSleep] = useState<number>(0)
  const [totalWater, setTotalWater] = useState<number>(0)
  const [totalExercise, setTotalExercise] = useState<number>(0)
  const [totalMeditation, setTotalMeditation] = useState<number>(0)
  const [logCount, setLogCount] = useState<number>(0)

  const latestLog = userLogs[0]

  const token = sessionStorage.getItem('token')
  const id = sessionStorage.getItem('id')

  useEffect(() => {
    if (!token || !id) {
      setError('User not logged in')
      setLoading(false)
      return
    }

    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5555/userdetails/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error('Failed to fetch user details')

        const data: User = await res.json()
        setUserDetails(data)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [token, id])

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/logs`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('failed to get details')
        return res.json()
      })
      .then((data) => setUserLogs(data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (!token) return

    fetch("http://127.0.0.1:5555/logs/totals", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch totals")
        return res.json()
      })
      .then(data => {
        setAvgSleep(data.avg_sleep)
        setTotalWater(data.total_water)
        setTotalExercise(data.total_exercise)
        setTotalMeditation(data.total_meditation)
        setLogCount(data.log_count)
      })
      .catch(console.error)
  }, [token])

  function getMedal(logCount: number) {
    if (logCount >= 6) return "gold"
    if (logCount >= 4) return "bronze"
    if (logCount >= 2) return "silver"
    return "none"
  }

  const medalImage = getMedal(logCount) !== "none" ? `/${getMedal(logCount)}.png` : null

  if (loading) return <div className="flex w-full items-center justify-center">Loading...</div>
  if (error) return <div className="flex w-full items-center justify-center text-red-500">{error}</div>

  const calendarClasses=[' text-dark:text-[#59ffb1cc] text-[rgba(8,185,103,0.8)] h- text-[12px]  rounded-md']

  const doughnutData = {
    labels: ['Water', 'Exercise', 'Meditation', 'Sleep'],
    datasets: [
      {
        label: 'Your Stats',
        data: [totalWater, totalExercise, totalMeditation, avgSleep],
        backgroundColor: ['#34d399', '#fb923c', '#22d3ee', '#6366f1'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="flex w-full flex-col lg:grid lg:grid-cols-3 gap-5 iems-center justify-center">
      <div className='col-span-2 flex w-full items-center flex-col'>
        <section className='flex bg-gray-100 dark:bg-[#212121] p-4 rounded-lg lg:grid grid-cols-3 w-full items-center justify-between flex-col'>
          <div className='flex col-span-2 flex-col items-center'>
            <h1 className='flex w-full text-xl'>
              Hello 
              <span className='ml-2 dark:text-[#59ffb1cc] text-[rgba(8,185,103,0.8)]'>
                {userDetails?.username}!
              </span>
            </h1>
             <p className='text-[12px] flex w-full mt-4 dark:text-gray-300'>
              Small steps today lead to better health tomorrow. Every positive choice you make adds up over time, so keep going at your own pace. Consistency matters more than perfection and today’s effort is an investment in your future wellbeing. 💚
            </p>
          </div>

          <Image 
            src='/hero.png'
            alt='hero'
            width={200}
            height={200}
            className='w-40 block h-auto object-cover'
          />
        </section>

        {
          userLogs.length < 1 ? <div className='flex mt-5 flex-col w-full items-center justify-center'>
            
            <Image  src='/tomandjerry.png'
            alt='hero'
            width={200}
            height={200}
            className='w-60 block h-auto object-cover'/>
            <h1>Oops ! You don't have any statistics yet.</h1>
            <p className='text-[13px] flex'>Visit <Link className='flex ml-2 mr-2  text-dark:text-[#59ffb1cc] text-[rgba(8,185,103,0.8)]' href='/dashboard/logs'>Create Logs</Link> To create new logs</p>
          </div> : <>
  <section className='flex mt-3 lg:grid lg:grid-cols-4 gap-4 bg-gray-100 dark:bg-[#212121] p-4 rounded-md w-full items-center justify-center'>
    {/* Water Card */}
    <div className='grid  bg-linear-to-r from-emerald-400  to-teal-500 grid-cols-3 items-center justify-center gap-2 p-2 bg-white dark:bg-[#2a2a2a] rounded-md'>
      <section>
        <Image 
          src='/water.jpg'
          alt='hero'
          width={100}
          height={100}
          className='w-10 h-10 rounded-full block object-cover'
        />
      </section>
      <section className='col-span-2 flex flex-col items-center w-full'>
        <h1 className='text-dark:text-[#59ffb1cc] text-[rgba(23,23,23,0.8)] text-[12px] w-full'>Water Taken</h1>
        <p className='text-[15px] w-full flex items-center'>{totalWater} <span className='ml-2 text-[12px]'>Gallons</span></p>
      </section>
    </div>

    {/* Exercise Card */}
    <div className='grid grid-cols-3 bg-linear-to-r from-orange-500 to-pink-500 items-center justify-center gap-2 p-2 bg-white dark:bg-[#2a2a2a] rounded-md'>
      <section>
        <Image 
          src='/fitness.jpg'
          alt='hero'
          width={100}
          height={100}
          className='w-10 h-10 rounded-full block object-cover'
        />
      </section>
      <section className='col-span-2 flex flex-col items-center w-full'>
        <h1 className='text-dark:text-[#59ffb1cc] text-[rgba(255,255,255,0.8)] text-[12px] w-full'>Exercise Time</h1>
        <p className='text-[15px] w-full flex items-center'>{totalExercise} <span className='ml-2 text-[12px]'>Hours</span></p>
      </section>
    </div>

    {/* Meditation Card */}
    <div className='grid grid-cols-3 bg-linear-to-r from-cyan-400 to-blue-500 items-center justify-center gap-2 p-2 bg-white dark:bg-[#2a2a2a] rounded-md'>
      <section>
        <Image 
          src='/meditation.jpg'
          alt='hero'
          width={100}
          height={100}
          className='w-10 h-10 rounded-full block object-cover'
        />
      </section>
      <section className='col-span-2 flex flex-col items-center w-full'>
        <h1 className='text-dark:text-[#59ffb1cc] text-[rgba(255,255,255,0.8)] text-[12px] w-full'>Meditation</h1>
        <p className='text-[15px] w-full flex items-center'>{totalMeditation} <span className='ml-2 text-[12px]'>Minutes</span></p>
      </section>
    </div>

    {/* Sleep Card */}
    <div className='grid grid-cols-3 bg-linear-to-r from-indigo-500 to-purple-600 items-center justify-center gap-2 p-2 bg-white dark:bg-[#2a2a2a] rounded-md'>
      <section>
        <Image 
          src='/sleep.jpg'
          alt='hero'
          width={100}
          height={100}
          className='w-10 h-10 rounded-full block object-cover'
        />
      </section>
      <section className='col-span-2 flex flex-col items-center w-full'>
        <h1 className='text-dark:text-[#59ffb1cc] text-[rgba(255,255,255,0.8)] text-[12px] w-full'>Average Sleep</h1>
        <p className='text-[15px] w-full flex items-center'>{avgSleep} <span className='ml-2 text-[12px]'>Hours</span></p>
      </section>
    </div>
  </section>
  <section className='flex rounded-md h-15 w-full items-center bg-linear-to-r from-emerald-400  to-teal-500 mt-3 ' >

    {latestLog && (
  <section className="flex flex-col w-full items-center justify-center">
    <h2 className="text-sm ">Quote of the Day</h2>
    <p className="mt-1 text-[12px] text-gray-700 items-center text-center justify-center flex w-full">
      {latestLog.quote_of_the_day}
    </p>
  </section>
)}

 </section>
 <section className='w-full items-center justify-center grid grid-cols-2 mt-3 gap-4'>
          {/* Donut chart */}
          <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-[#212121] rounded-md">
            <Doughnut data={doughnutData} />
          </div>

          <section className='w-full flex flex-col items-center justify-center mt-3'>
  {logCount >= 2 ? (
    <div className="flex flex-col items-center">
     
      <Image
        src={`/${getMedal(logCount)}.png`}
        alt={`${getMedal(logCount)} medal`}
        width={100}
        height={100}
        className="w-30 h-45 object-contain"
      />
      <p className="mt-2 text-[12px] text-center">
        {getMedal(logCount).charAt(0).toUpperCase() + getMedal(logCount).slice(1)} medal for your dedication. Keep winning!
      </p>
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <h2 className="text-sm mb-2">No Medal Yet!</h2>
      <Image
        src="/tomandjerry.png"
        alt="No medal"
        width={100}
        height={100}
        className="w-24 h-24 object-contain"
      />
      <p className="mt-2 text-[12px] text-center">
        Start a streak! Create 3 logs to earn your first medal 🏅
      </p>
    </div>
  )}
</section>
        </section>
</>
        }

      </div>

      <div className='flex flex-col rounded-lg'>
        <section className='bg-inherit text-dark:text-[#59ffb1cc] text-[rgba(8,185,103,0.8)] rounded-lg'>
          <Calendar
            onChange={(value) => setDate(value as Date)}
            value={date}
            className={calendarClasses}
          />
        </section>
        <section className='flex w-full mt-2 items-center'>
          <h1 className='flex text-[12px]'> <span className='mr-2 dark:text-[#59ffb1cc] text-[rgba(8,185,103,0.8)]'>{userDetails?.username}'s</span> Recent Logs</h1>
        </section>
        <section className=' flex w-full  mt-3 flex-col'>
          {userLogs.map((log)=>(
              <div key={log.id} className='flex flex-col w-full items-center justify-center '>
                <section className='bg-gray-100 grid grid-cols-3 gap-2 w-full items-center justify-center h-22 p-2 mb-2 rounded-md dark:bg-[#212121]'>
                  <Image 
                  src='/health.jpg'
                  alt='hero'
                  width={100}
                  height={100}
                  className='w-10 h-10 rounded-full block  object-cover'
                  />
                  <div className='col-span-2 flex w-full items-center flex-col '>
                    <h1 className='flex text-[13px] w-full text-dark:text-[#59ffb1cc] text-[rgba(8,185,103,0.8)]'>{log.hashtag}</h1>
                    <h3 className='mt-1 flex w-full text-[10px]'>Your lows</h3>
                    <p className='mt-1 flex w-full text-[10px]'>{log.low_moments}</p>

                  </div>
                  
                </section>
              </div>
            ))}
        </section>
      </div>
      
    </div>
  )
}

export default Home