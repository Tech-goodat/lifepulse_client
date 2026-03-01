'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface LogForm {
  hashtag: string
  average_sleep: number
  total_water_taken: number
  total_exercise_time: number
  total_meditation_time: number
  low_moments: string
  cope_up: string
  quote_of_the_day: string
}

const Logs = () => {
  const [formData, setFormData] = useState<LogForm>({
    hashtag: '',
    average_sleep: 0,
    total_water_taken: 0,
    total_exercise_time: 0,
    total_meditation_time: 0,
    low_moments: '',
    cope_up: '',
    quote_of_the_day: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('token')
        : null

    if (!storedToken) {
      setError('You must be logged in to create a log.')
      return
    }

    setToken(storedToken)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'number' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    if (!token) {
      setError('You must be logged in to create a log.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('http://127.0.0.1:5555/addlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create log')
      }

      setSuccess('Log created successfully!')
      setFormData({
        hashtag: '',
        average_sleep: 0,
        total_water_taken: 0,
        total_exercise_time: 0,
        total_meditation_time: 0,
        low_moments: '',
        cope_up: '',
        quote_of_the_day: ''
      })
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-center justify-center p-5">
      <div className="flex-1 flex justify-center">
        <Image
          src="/login.jpg"
          alt="Form Illustration"
          width={500}
          height={500}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex-1 bg-gray-100 dark:bg-[#212121] p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl mb-4 text-center">Create Your Health Log</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="hashtag"
            placeholder="Hashtag"
            value={formData.hashtag}
            onChange={handleChange}
            className="p-2 text-[12px] rounded-md bg-white dark:bg-[#2a2a2a]"
            required
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            <Input label="Sleep (hrs)" name="average_sleep" value={formData.average_sleep} onChange={handleChange} />
            <Input label="Water (Gallons)" name="total_water_taken" value={formData.total_water_taken} onChange={handleChange} />
            <Input label="Exercise (hrs)" name="total_exercise_time" value={formData.total_exercise_time} onChange={handleChange} />
            <Input label="Meditation (mins)" name="total_meditation_time" value={formData.total_meditation_time} onChange={handleChange} />

          </div>

          <textarea name="low_moments" placeholder="Low Moments" value={formData.low_moments} onChange={handleChange} className="p-2 text-[12px] rounded-md bg-white dark:bg-[#2a2a2a]" required />
          <textarea name="cope_up" placeholder="How did you cope?" value={formData.cope_up} onChange={handleChange} className="p-2 text-[12px] rounded-md bg-white dark:bg-[#2a2a2a]" required />
          <textarea name="quote_of_the_day" placeholder="Quote of the Day (optional)" value={formData.quote_of_the_day} onChange={handleChange} className="p-2 text-[12px] rounded-md bg-white dark:bg-[#2a2a2a]" />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 p-2 text-[12px] bg-emerald-400 dark:bg-[#59ffb1cc] rounded-md text-white"
          >
            {loading ? 'Saving...' : 'Save Log'}
          </button>
        </form>
      </div>
    </div>
  )
}

const Input = ({
  label,
  name,
  value,
  onChange
}: {
  label: string
  name: string
  value: number
  onChange: any
}) => (
  <div className="flex flex-col items-center">
    <label className="text-[12px] dark:text-[#59ffb1cc] mb-1">{label}</label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      className="p-2 text-[12px] rounded-md bg-white dark:bg-[#2a2a2a] w-full text-center"
      required
    />
  </div>
)

export default Logs