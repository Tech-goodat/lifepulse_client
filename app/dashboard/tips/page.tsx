'use client'
import React from 'react'

const Tips = () => {
  const wellnessTips = [
    "Drink at least 8 glasses of water daily to stay hydrated.",
    "Aim for 7-9 hours of sleep every night to recharge your body.",
    "Incorporate at least 30 minutes of exercise into your day.",
    "Take short breaks for meditation or deep breathing to reduce stress.",
    "Eat a balanced diet rich in fruits, vegetables, and whole grains."
  ]

  return (
    <div className="flex flex-col items-center justify-center p-5 gap-4">
      <h2 className="text-2xl mb-4 text-center dark:text-[#59ffb1cc]">Wellness Tips</h2>
      <ul className="flex flex-col gap-3 w-full max-w-2xl">
        {wellnessTips.map((tip, index) => (
          <li
            key={index}
            className="bg-gray-100 dark:bg-[#212121] p-4 rounded-lg shadow-md text-[14px] dark:text-gray-200"
          >
            {index + 1}. {tip}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tips