'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Log {
  id: number
  hashtag: string
  average_sleep: string
  total_water_taken: number
  total_exersise_time: number
  total_meditation_time: number
  low_moments: string
  cope_up: string
  quote_of_the_day: string
}

const History = () => {
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingLogId, setEditingLogId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<Log>>({})

  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      setError('You must be logged in to view your logs.')
      setLoading(false)
      return
    }

    const fetchLogs = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5555/logs', {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (!res.ok) throw new Error('Failed to fetch logs')

        const data: Log[] = await res.json()
        setLogs(data)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [token])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this log?')) return

    try {
      const res = await fetch(`http://127.0.0.1:5555/deletelog/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) throw new Error('Failed to delete log')

      setLogs((prev) => prev.filter((log) => log.id !== id))
    } catch (err: any) {
      alert(err.message || 'Something went wrong')
    }
  }

  const handleEditClick = (log: Log) => {
    setEditingLogId(log.id)
    setEditForm({
      hashtag: log.hashtag,
      average_sleep: log.average_sleep,
      total_water_taken: log.total_water_taken,
      total_exersise_time: log.total_exersise_time,
      total_meditation_time: log.total_meditation_time,
      low_moments: log.low_moments,
      cope_up: log.cope_up,
      quote_of_the_day: log.quote_of_the_day
    })
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditSubmit = async (id: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:5555/editlog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      })

      if (!res.ok) throw new Error('Failed to update log')

      const updatedLog = await res.json()
      setLogs((prev) => prev.map((log) => (log.id === id ? updatedLog : log)))
      setEditingLogId(null)
    } catch (err: any) {
      alert(err.message || 'Something went wrong')
    }
  }

  if (loading) return <div className="flex w-full justify-center items-center mt-10">Loading logs...</div>
  if (error) return <div className="flex w-full justify-center items-center text-red-500 mt-10">{error}</div>

  return (
    <div className="flex flex-col items-center justify-center p-5 gap-5">
      <h2 className="text-2xl mb-5 text-center dark:text-[#59ffb1cc]">Your Logs History</h2>

      {logs.length === 0 ? (
        <div className="flex flex-col items-center gap-3">
          <Image src="/tomandjerry.png" alt="No logs" width={200} height={200} />
          <p className="text-gray-600 dark:text-gray-300">No history yet.</p>
          <Link href="/dashboard/logs" className="text-emerald-400 dark:text-[#59ffb1cc] underline">
            Create your first log
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {logs.map((log) => (
            <div
              key={log.id}
              className="relative bg-gray-100 dark:bg-[#212121] rounded-lg p-4 flex flex-col gap-2 shadow-md group transition-all duration-200 hover:scale-105 hover:h-[320px]"
            >
              {editingLogId === log.id ? (
                <div className="flex flex-col gap-2">
                  <input
                    name="hashtag"
                    value={editForm.hashtag}
                    onChange={handleEditChange}
                    className="p-1 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-200 focus:outline-none"
                  />
                  <input
                    name="average_sleep"
                    type="number"
                    value={editForm.average_sleep}
                    onChange={handleEditChange}
                    className="p-1 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-200 focus:outline-none"
                  />
                  <input
                    name="total_water_taken"
                    type="number"
                    value={editForm.total_water_taken}
                    onChange={handleEditChange}
                    className="p-1 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-200 focus:outline-none"
                  />
                  <input
                    name="total_exersise_time"
                    type="number"
                    value={editForm.total_exersise_time}
                    onChange={handleEditChange}
                    className="p-1 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-200 focus:outline-none"
                  />
                  <input
                    name="total_meditation_time"
                    type="number"
                    value={editForm.total_meditation_time}
                    onChange={handleEditChange}
                    className="p-1 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-200 focus:outline-none"
                  />
                  <textarea
                    name="low_moments"
                    value={editForm.low_moments}
                    onChange={handleEditChange}
                    className="p-1 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-200 focus:outline-none"
                  />
                  <textarea
                    name="cope_up"
                    value={editForm.cope_up}
                    onChange={handleEditChange}
                    className="p-1 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-200 focus:outline-none"
                  />
                  <textarea
                    name="quote_of_the_day"
                    value={editForm.quote_of_the_day}
                    onChange={handleEditChange}
                    className="p-1 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-200 focus:outline-none"
                  />
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => handleEditSubmit(log.id)}
                      className="p-2 px-6 bg-emerald-400 dark:bg-[#59ffb1cc] rounded-md text-white text-[12px] hover:bg-emerald-500 dark:hover:bg-[#4edfa0]"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingLogId(null)}
                      className="p-2 px-6 bg-gray-500 dark:bg-gray-700 rounded-md text-white text-[12px] hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold dark:text-[#59ffb1cc]">{log.hashtag}</h3>

                  <div className="flex flex-wrap gap-2 text-[12px]">
                    <p>Sleep: {log.average_sleep} hrs</p>
                    <p>Water: {log.total_water_taken} gallons</p>
                    <p>Exercise: {log.total_exersise_time} hrs</p>
                    <p>Meditation: {log.total_meditation_time} mins</p>
                  </div>

                  <p className="text-[12px] mt-2"><strong>Lows:</strong> {log.low_moments}</p>
                  <p className="text-[12px]"><strong>Cope Up:</strong> {log.cope_up}</p>
                  {log.quote_of_the_day && <p className="text-[12px] italic mt-1">"{log.quote_of_the_day}"</p>}

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      className="p-2 w-30 px-6 bg-emerald-400 dark:bg-[#59ffb1cc] rounded-md text-white text-[12px] hover:bg-emerald-500 dark:hover:bg-[#4edfa0]"
                      onClick={() => handleEditClick(log)}
                    >
                      Edit
                    </button>
                    <button
                      className="p-2 w-30 px-6 bg-red-500 dark:bg-[#ff5964] rounded-md text-white text-[12px] hover:bg-red-600"
                      onClick={() => handleDelete(log.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default History