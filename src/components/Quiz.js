'use client'
import { useState } from 'react'

const questions = [
  {
    id: 'social',
    question: 'Do you want to do this alone or with others?',
    options: [
      { label: 'Solo — just me', value: 'solo' },
      { label: 'With a friend or two', value: 'small' },
      { label: 'A group or community', value: 'community' },
      { label: 'Either works for me', value: 'any' },
    ],
  },
  {
    id: 'energy',
    question: 'How many spoons can you spare today?',
    subtitle: 'Spoons = energy units. Be honest!',
    options: [
      { label: 'Running low', value: 'low' },
      { label: 'A few to spare', value: 'medium' },
      { label: 'All the spoons', value: 'high' },
      { label: 'It varies — show me both', value: 'any' },
    ],
  },
  {
    id: 'location',
    question: 'Where do you want to be?',
    options: [
      { label: 'Outside in the fresh air', value: 'outdoor' },
      { label: 'Indoors, cosy', value: 'indoor' },
      { label: 'No strong preference', value: 'any' },
    ],
  },
  {
    id: 'goal',
    question: 'What do you want to get out of it?',
    options: [
      { label: 'Relax and decompress', value: 'relax' },
      { label: 'Learn something new', value: 'learn' },
      { label: 'Get moving and active', value: 'active' },
      { label: 'Make or create something', value: 'make' },
    ],
  },
]

export default function Quiz({ onComplete }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      onComplete(newAnswers)
    }
  }

  const question = questions[currentQ]

  return (
    <section className="max-w-xl mx-auto px-6 py-20">

      {/* Progress bar */}
      <div className="flex gap-2 mb-12">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= currentQ ? 'bg-emerald-500' : 'bg-gray-100'
            }`}
          />
        ))}
      </div>

      <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
        Question {currentQ + 1} of {questions.length}
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {question.question}
      </h2>

      {question.subtitle && (
        <p className="text-sm text-gray-400 mb-8">{question.subtitle}</p>
      )}
      {!question.subtitle && <div className="mb-8" />}

      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(question.id, option.value)}
            className="p-4 rounded-2xl border border-gray-100 hover:border-emerald-400 hover:bg-emerald-50 transition-all text-left group w-full"
          >
            <span className="text-gray-800 font-medium group-hover:text-emerald-700">
              {option.label}
            </span>
          </button>
        ))}
      </div>

    </section>
  )
}