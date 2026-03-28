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

export default function Quiz(){

}