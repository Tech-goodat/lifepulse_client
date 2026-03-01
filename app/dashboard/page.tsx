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

  // ✅ SAFE sessionStorage access
  const [token, setToken] = useState<string | null>(null)
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(sessionStorage.getItem('token'))
      setId(sessionStorage.getItem('id'))
    }
  }, [])

  const latestLog = userLogs[0]

  useEffect(() => {
    if (!token || !id) return

    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5555/userdetails/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error('Failed to fetch user details')
        const data: User = await res.json()
        setUserDetails(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [token, id])

  useEffect(() => {
    if (!token) return
    fetch(`http://127.0.0.1:5555/logs`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setUserLogs)
      .catch(console.error)
  }, [token])

  useEffect(() => {
    if (!token) return
    fetch("http://127.0.0.1:5555/logs/totals", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setAvgSleep(data.avg_sleep)
        setTotalWater(data.total_water)
        setTotalExercise(data.total_exercise)
        setTotalMeditation(data.total_meditation)
        setLogCount(data.log_count)
      })
      .catch(console.error)
  }, [token])

  function getMedal(count: number) {
    if (count >= 6) return "gold"
    if (count >= 4) return "bronze"
    if (count >= 2) return "silver"
    return "none"
  }

  // ✅ YOUR ORIGINAL CALENDAR CLASSES RESTORED
  const calendarClasses = [
    'text-dark:text-[#59ffb1cc]',
    'text-[rgba(8,185,103,0.8)]',
    'text-[12px]',
    'rounded-md'
  ]

  if (loading) return <div className="flex w-full items-center justify-center">Loading...</div>
  if (error) return <div className="flex w-full items-center justify-center text-red-500">{error}</div>

  const doughnutData = {
    labels: ['Water', 'Exercise', 'Meditation', 'Sleep'],
    datasets: [
      {
        label: 'Your Stats',
        data: [totalWater, totalExercise, totalMeditation, avgSleep],
        backgroundColor: ['#34d399', '#fb923c', '#22d3ee', '#6366f1'],
      },
    ],
  }

  return (
    <div className="flex w-full flex-col lg:grid lg:grid-cols-3 gap-5">

      <div className='col-span-2 flex w-full flex-col items-center'>

        {/* HERO */}
        <section className='flex bg-gray-100 dark:bg-[#212121] p-4 rounded-lg lg:grid grid-cols-3 w-full items-center'>
          <div className='flex col-span-2 flex-col items-center'>
            <h1 className='flex w-full text-xl'>
              Hello 
              <span className='ml-2 text-emerald-400'>
                {userDetails?.username}!
              </span>
            </h1>
            <p className='text-[12px] flex w-full mt-4 dark:text-gray-300'>
              Small steps today lead to better health tomorrow.
            </p>
          </div>
          <Image src='/hero.png' alt='hero' width={200} height={200} className='w-40 h-auto object-cover'/>
        </section>

        {userLogs.length < 1 ? (
          <div className='flex mt-5 flex-col w-full items-center'>
            <Image src='/tomandjerry.png' alt='empty' width={200} height={200}/>
            <h1>No statistics yet.</h1>
            <p className='text-[13px]'>
              Visit <Link className='text-emerald-400 ml-1 mr-1' href='/dashboard/logs'>Create Logs</Link>
            </p>
          </div>
        ) : (
          <>
            {/* STATS CARDS */}
            <section className='grid lg:grid-cols-4 gap-4 bg-gray-100 dark:bg-[#212121] p-4 rounded-md w-full mt-3'>

              <div className='grid grid-cols-3 items-center gap-2 p-3 rounded-md text-white bg-gradient-to-r from-emerald-400 to-teal-500'>
                <Image src='/water.jpg' alt='water' width={40} height={40} className='rounded-full'/>
                <div className='col-span-2'>
                  <h1 className='text-xs'>Water Taken</h1>
                  <p>{totalWater} <span className='text-xs'>Gallons</span></p>
                </div>
              </div>

              <div className='grid grid-cols-3 items-center gap-2 p-3 rounded-md text-white bg-gradient-to-r from-orange-500 to-pink-500'>
                <Image src='/fitness.jpg' alt='fitness' width={40} height={40} className='rounded-full'/>
                <div className='col-span-2'>
                  <h1 className='text-xs'>Exercise</h1>
                  <p>{totalExercise} <span className='text-xs'>Hours</span></p>
                </div>
              </div>

              <div className='grid grid-cols-3 items-center gap-2 p-3 rounded-md text-white bg-gradient-to-r from-cyan-400 to-blue-500'>
                <Image src='/meditation.jpg' alt='meditation' width={40} height={40} className='rounded-full'/>
                <div className='col-span-2'>
                  <h1 className='text-xs'>Meditation</h1>
                  <p>{totalMeditation} <span className='text-xs'>Minutes</span></p>
                </div>
              </div>

              <div className='grid grid-cols-3 items-center gap-2 p-3 rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600'>
                <Image src='/sleep.jpg' alt='sleep' width={40} height={40} className='rounded-full'/>
                <div className='col-span-2'>
                  <h1 className='text-xs'>Average Sleep</h1>
                  <p>{avgSleep} <span className='text-xs'>Hours</span></p>
                </div>
              </div>

            </section>

            {/* QUOTE */}
            {latestLog && (
              <section className='flex rounded-md w-full items-center bg-gradient-to-r from-emerald-400 to-teal-500 mt-3 p-3 text-center'>
                <div className='w-full'>
                  <h2 className='text-sm'>Quote of the Day</h2>
                  <p className='text-[12px]'>{latestLog.quote_of_the_day}</p>
                </div>
              </section>
            )}

            {/* CHART + MEDAL */}
            <section className='grid grid-cols-2 mt-3 gap-4 w-full'>
              <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-[#212121] rounded-md">
                <Doughnut data={doughnutData} />
              </div>

              <div className='flex flex-col items-center justify-center'>
                {logCount >= 2 ? (
                  <>
                    <Image src={`/${getMedal(logCount)}.png`} alt='medal' width={100} height={100}/>
                    <p className='text-[12px] text-center mt-2'>
                      {getMedal(logCount)} medal for your dedication!
                    </p>
                  </>
                ) : (
                  <>
                    <Image src='/tomandjerry.png' alt='no medal' width={100} height={100}/>
                    <p className='text-[12px] text-center mt-2'>
                      Create 3 logs to earn your first medal 🏅
                    </p>
                  </>
                )}
              </div>
            </section>
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className='flex flex-col rounded-lg'>
        <section className='bg-inherit rounded-lg'>
          <Calendar
            onChange={(value) => setDate(value as Date)}
            value={date}
            className={calendarClasses.join(' ')}
          />
        </section>
      </div>

    </div>
  )
}

export default Home