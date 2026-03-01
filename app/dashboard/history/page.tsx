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
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = typeof window !== 'undefined'
      ? sessionStorage.getItem('token')
      : null

    if (!storedToken) {
      setError('You must be logged in to view your logs.')
      setLoading(false)
      return
    }

    setToken(storedToken)
  }, [])

  useEffect(() => {
    if (!token) return

    fetch('http://127.0.0.1:5555/logs', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch logs')
        return res.json()
      })
      .then(setLogs)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [token])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this log?')) return

    try {
      const res = await fetch(`http://127.0.0.1:5555/deletelog/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) throw new Error('Failed to delete log')

      setLogs(prev => prev.filter(log => log.id !== id))
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleEditClick = (log: Log) => {
    setEditingLogId(log.id)
    setEditForm({ ...log })
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
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
      setLogs(prev => prev.map(log => log.id === id ? updatedLog : log))
      setEditingLogId(null)
    } catch (err: any) {
      alert(err.message)
    }
  }

  if (loading) return <div className="flex w-full justify-center mt-10">Loading logs...</div>
  if (error) return <div className="flex w-full justify-center text-red-500 mt-10">{error}</div>

  return (
    <div className="flex flex-col items-center p-5 gap-5">
      <h2 className="text-2xl text-center dark:text-[#59ffb1cc]">Your Logs History</h2>

      {logs.length === 0 ? (
        <div className="flex flex-col items-center gap-3">
          <Image src="/tomandjerry.png" alt="No logs" width={200} height={200} />
          <p className="text-gray-600 dark:text-gray-300">No history yet.</p>
          <Link href="/dashboard/logs" className="text-emerald-400 underline">
            Create your first log
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {logs.map(log => (
            <div key={log.id} className="relative bg-gray-100 dark:bg-[#212121] rounded-lg p-4 flex flex-col gap-2 shadow-md group">

              {editingLogId === log.id ? (
                <div className="flex flex-col gap-2">
                  <input name="hashtag" value={editForm.hashtag ?? ''} onChange={handleEditChange} className="p-1 rounded-md bg-white dark:bg-[#2a2a2a]" />
                  <input name="average_sleep" value={editForm.average_sleep ?? ''} onChange={handleEditChange} className="p-1 rounded-md bg-white dark:bg-[#2a2a2a]" />
                  <input name="total_water_taken" value={editForm.total_water_taken ?? ''} onChange={handleEditChange} className="p-1 rounded-md bg-white dark:bg-[#2a2a2a]" />
                  <input name="total_exersise_time" value={editForm.total_exersise_time ?? ''} onChange={handleEditChange} className="p-1 rounded-md bg-white dark:bg-[#2a2a2a]" />
                  <input name="total_meditation_time" value={editForm.total_meditation_time ?? ''} onChange={handleEditChange} className="p-1 rounded-md bg-white dark:bg-[#2a2a2a]" />
                  <textarea name="low_moments" value={editForm.low_moments ?? ''} onChange={handleEditChange} className="p-1 rounded-md bg-white dark:bg-[#2a2a2a]" />
                  <textarea name="cope_up" value={editForm.cope_up ?? ''} onChange={handleEditChange} className="p-1 rounded-md bg-white dark:bg-[#2a2a2a]" />
                  <textarea name="quote_of_the_day" value={editForm.quote_of_the_day ?? ''} onChange={handleEditChange} className="p-1 rounded-md bg-white dark:bg-[#2a2a2a]" />

                  <div className="flex gap-2">
                    <button onClick={() => handleEditSubmit(log.id)} className="p-2 px-6 bg-emerald-400 rounded-md text-white text-xs">Save</button>
                    <button onClick={() => setEditingLogId(null)} className="p-2 px-6 bg-gray-500 rounded-md text-white text-xs">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold dark:text-[#59ffb1cc]">{log.hashtag}</h3>

                  <div className="text-xs flex flex-wrap gap-2">
                    <p>Sleep: {log.average_sleep} hrs</p>
                    <p>Water: {log.total_water_taken} gallons</p>
                    <p>Exercise: {log.total_exersise_time} hrs</p>
                    <p>Meditation: {log.total_meditation_time} mins</p>
                  </div>

                  <p className="text-xs"><strong>Lows:</strong> {log.low_moments}</p>
                  <p className="text-xs"><strong>Cope:</strong> {log.cope_up}</p>
                  {log.quote_of_the_day && <p className="text-xs italic">"{log.quote_of_the_day}"</p>}

                  <div className="flex gap-3 mt-3">
                    <button onClick={() => handleEditClick(log)} className="p-2 px-6 bg-emerald-400 rounded-md text-white text-xs">Edit</button>
                    <button onClick={() => handleDelete(log.id)} className="p-2 px-6 bg-red-500 rounded-md text-white text-xs">Delete</button>
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