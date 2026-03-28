'use client'

import { useState } from 'react'

/* ════════════════════════════════════════════════════════════
   HARDCODED DATA — KNITTING & WEAVING
   ════════════════════════════════════════════════════════════ */

const ACTIVITY = {
  name: 'Knitting & Weaving',
  category: 'Making & Crafting',
  spoons: 1,
  cost: '£',
  costNote: 'Under £20/month',
  social: 'both',
  place: 'Indoor',
  heroImage: 'https://images.unsplash.com/photo-1513890333407-6f85205e8ef2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description:
    'Knitting and weaving are repetitive, rhythmic crafts with a well-documented calming effect on the nervous system, often compared to meditation. They produce tangible, useful objects and have an enormous creative ceiling in terms of pattern complexity and colour work. Both crafts have thriving online and in-person communities, and knitting in particular is enjoying a major cultural resurgence with younger generations.',
  highlights: [
    'Proven stress and anxiety reduction',
    'Portable - knit anywhere',
    'Huge online community and free patterns',
    'Produces wearable, giftable items',
  ],
  localPlaces: [
    { name: 'Various cafes in Southsea', detail: 'Knit-and-natter groups' },
    { name: 'John Lewis, Commercial Road', detail: 'Yarn and supplies' },
    { name: 'The Wool Shop, Fareham', detail: '15 min drive, specialist yarns' },
    { name: 'Ravelry Online Community', detail: 'Free patterns and forums' },
  ],
  starterKit: {
    items: [
      {
        name: 'Bamboo Needles Set',
        description: 'Sizes 4mm to 6mm. Smooth, lightweight, and kind on hands.',
        image: 'https://images.unsplash.com/photo-1585435465945-bef5a93f8849?w=400&q=80',
      },
      {
        name: 'Worsted Weight Yarn',
        description: 'Medium weight acrylic-wool blend. Forgiving for beginners.',
        image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80',
      },
      {
        name: 'Stitch Markers & Scissors',
        description: 'Locking markers, tapestry needle, and small sharp scissors.',
        image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&q=80',
      },
    ],
    estimatedCost: 'approx. £15 to £25',
  },
}

/* ════════════════════════════════════════════════════════════
   COMPONENTS
   ════════════════════════════════════════════════════════════ */

function SpoonRating({ spoons }) {
  return (
    <div className="flex items-center gap-1" title={`Energy level: ${spoons}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`w-3 h-3 rounded-full ${i < spoons ? 'bg-sage-special' : 'bg-gray-200'}`}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1.5">({spoons}/5 energy)</span>
    </div>
  )
}

function InfoChip({ children }) {
  return (
    <span className="px-3 py-1.5 rounded-md bg-gray-100 text-xs font-medium text-gray-600">
      {children}
    </span>
  )
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════ */

export default function ActivityPage() {
  const [kitRequested, setKitRequested] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* ─── Breadcrumb ─── */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <a href="/activities" className="hover:text-sage-special transition-colors">Activities</a>
          <span>/</span>
          <span className="text-gray-600">{ACTIVITY.category}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{ACTIVITY.name}</span>
        </div>

        {/* ─── Hero Section (image left, info right) ─── */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          {/* Hero image */}
          <div className="md:w-1/2 flex-shrink-0">
            <div className="rounded-lg overflow-hidden aspect-[4/3] bg-gray-100">
              <img
                src={ACTIVITY.heroImage}
                alt={ACTIVITY.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{ACTIVITY.name}</h1>
            </div>
            <p className="text-xs text-gray-400 mb-4">{ACTIVITY.category}</p>

            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              {ACTIVITY.description}
            </p>

            {/* Info chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              <InfoChip>{ACTIVITY.cost} · {ACTIVITY.costNote}</InfoChip>
              <InfoChip>{ACTIVITY.place}</InfoChip>
              <InfoChip>{ACTIVITY.social === 'both' ? 'Solo or Group' : ACTIVITY.social}</InfoChip>
            </div>

            {/* Spoons */}
            <SpoonRating spoons={ACTIVITY.spoons} />

            {/* Highlights */}
            <ul className="mt-5 space-y-2">
              {ACTIVITY.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-sage-special" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── Starter Kit Section ─── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Starter Kit Includes</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Everything you need to get going · Estimated cost: {ACTIVITY.starterKit.estimatedCost}
              </p>
            </div>
            <button
              onClick={() => setKitRequested(!kitRequested)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                kitRequested
                  ? 'bg-gray-100 text-gray-600 border border-gray-200'
                  : 'bg-sage-special text-white hover:opacity-90'
              }`}
            >
              {kitRequested ? 'Kit Requested' : 'Get Starter Kit'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ACTIVITY.starterKit.items.map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 overflow-hidden bg-white hover:shadow-sm transition-shadow"
              >
                <div className="aspect-[3/2] bg-gray-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Local Places ─── */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Where to Go in Portsmouth</h2>
          <p className="text-xs text-gray-400 mb-4">Local spots, shops, and communities</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ACTIVITY.localPlaces.map((place, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 bg-white hover:shadow-sm transition-shadow"
              >
                <span className="w-2 h-2 rounded-full bg-sage-special flex-shrink-0 mt-1.5" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{place.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{place.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Cost & Energy Summary Bar ─── */}
        <div className="rounded-lg border border-gray-200 p-5 bg-gray-50">
          <h2 className="text-sm font-bold text-gray-900 mb-3">At a Glance</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Monthly Cost</p>
              <p className="text-sm font-semibold text-gray-900">{ACTIVITY.cost}</p>
              <p className="text-xs text-gray-500">{ACTIVITY.costNote}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Energy Level</p>
              <SpoonRating spoons={ACTIVITY.spoons} />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Setting</p>
              <p className="text-sm font-semibold text-gray-900">{ACTIVITY.place}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Social</p>
              <p className="text-sm font-semibold text-gray-900">
                {ACTIVITY.social === 'both' ? 'Solo or Group' : ACTIVITY.social}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
