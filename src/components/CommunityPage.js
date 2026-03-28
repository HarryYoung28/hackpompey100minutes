'use client'

import { useState, useMemo, useRef } from 'react'

const CATEGORIES = [
  {
    name: 'Physical & Sports',
    subcommunities: [
      { name: 'Water Sports', members: 47, description: 'Kayaking, paddleboarding, windsurfing and more around the Solent.' },
      { name: 'Climbing & Bouldering', members: 62, description: 'Indoor walls and outdoor crags. All grades welcome.' },
      { name: 'Running', members: 89, description: 'Parkrun regulars, trail runners, and couch-to-5k newbies.' },
    ],
  },
  {
    name: 'Outdoor & Nature',
    subcommunities: [
      { name: 'Hiking & Wild Camping', members: 73, description: 'South Downs, coastal paths, and wild spots.' },
      { name: 'Birdwatching', members: 34, description: 'Farlington Marshes regulars and garden twitchers.' },
      { name: 'Photography', members: 56, description: 'Golden hour chasers. All cameras, all levels.' },
    ],
  },
  {
    name: 'Making & Crafting',
    subcommunities: [
      { name: 'Woodworking', members: 28, description: 'Joinery, carving, and turning. Sawdust enthusiasts.' },
      { name: 'Ceramics & Pottery', members: 41, description: 'Wheel-throwing, hand-building, and glaze experiments.' },
      { name: 'Electronics & Soldering', members: 35, description: 'Arduino, Pi, PCBs and blinky things.' },
    ],
  },
]

const TAGS = ['beginner', 'motivation', 'question']

const USERS = [
  { id: 1, name: 'You' },
  { id: 2, name: 'Sam W.' },
  { id: 3, name: 'Priya K.' },
  { id: 4, name: 'Jordan T.' },
  { id: 5, name: 'Alex M.' },
  { id: 6, name: 'Charlie R.' },
  { id: 7, name: 'Megan F.' },
  { id: 8, name: 'Ravi P.' },
]

const CURRENT_USER = USERS[0]

const INITIAL_POSTS = [
  { id: 1, community: 'Water Sports', category: 'Physical & Sports', user: USERS[1], text: 'Windy conditions at Eastney today, managed to get some great paddleboard time in before the gusts picked up. Anyone else brave it?', tags: ['motivation'], likes: 6, likedBy: [3, 4], comments: [{ id: 101, user: USERS[3], text: 'Was out kayaking! Choppy but brilliant.' }], timestamp: '2h ago' },
  { id: 2, community: 'Water Sports', category: 'Physical & Sports', user: USERS[7], text: 'Just signed up for the intro to windsurfing course at Southsea Watersports. Never done it before, any tips?', tags: ['beginner', 'question'], likes: 4, likedBy: [1, 2], comments: [{ id: 102, user: USERS[1], text: 'Wear a wetsuit even if it looks warm. The Solent is always cold!' }], timestamp: '5h ago' },
  { id: 3, community: 'Climbing & Bouldering', category: 'Physical & Sports', user: USERS[3], text: 'Finally sent my first V5 at Highball! The overhang on the green route took me three sessions to crack.', tags: ['motivation'], likes: 11, likedBy: [1, 2, 5], comments: [{ id: 103, user: USERS[4], text: 'That green route is sneaky. Nice work!' }, { id: 104, user: USERS[2], text: 'V5 club!' }], timestamp: '3h ago' },
  { id: 4, community: 'Climbing & Bouldering', category: 'Physical & Sports', user: USERS[6], text: 'Is Highball beginner-friendly? Thinking of going for the first time this weekend but feeling a bit nervous.', tags: ['beginner', 'question'], likes: 8, likedBy: [3, 4, 7], comments: [{ id: 105, user: USERS[3], text: 'Super friendly! Staff will show you the basics. Just wear comfy clothes.' }], timestamp: '7h ago' },
  { id: 5, community: 'Running', category: 'Physical & Sports', user: USERS[2], text: 'PB at Great Salterns Parkrun this morning, 23:42! The flat course really suits me. Who else was there?', tags: ['motivation'], likes: 14, likedBy: [1, 4, 5, 6], comments: [{ id: 106, user: USERS[5], text: 'Congrats Priya! Sub-24 is brilliant.' }], timestamp: '1h ago' },
  { id: 6, community: 'Running', category: 'Physical & Sports', user: USERS[4], text: 'Starting couch to 5k next week. Any route suggestions around Southsea that are not too hilly?', tags: ['beginner', 'question'], likes: 5, likedBy: [2, 3], comments: [{ id: 107, user: USERS[2], text: 'The seafront prom is dead flat and gorgeous. Perfect for C25K.' }], timestamp: '4h ago' },
  { id: 7, community: 'Hiking & Wild Camping', category: 'Outdoor & Nature', user: USERS[3], text: 'Butser Hill sunrise this morning was absolutely unreal. Frost on the ground, clear skies, not a soul around.', tags: ['motivation'], likes: 18, likedBy: [1, 2, 5, 6, 7], comments: [{ id: 108, user: USERS[1], text: 'Need to get up there before summer. What time did you start?' }], timestamp: '8h ago' },
  { id: 8, community: 'Hiking & Wild Camping', category: 'Outdoor & Nature', user: USERS[6], text: 'Any recommendations for a first wild camp? Got a tent and sleeping bag but never done it. South Downs ideally.', tags: ['beginner', 'question'], likes: 7, likedBy: [3, 4], comments: [{ id: 109, user: USERS[3], text: 'Old Winchester Hill is a great first spot. Sheltered and quiet.' }], timestamp: '1d ago' },
  { id: 9, community: 'Birdwatching', category: 'Outdoor & Nature', user: USERS[2], text: 'Spotted a kingfisher at Farlington Marshes today! Bright blue flash along the water channel. Made my whole week.', tags: ['motivation'], likes: 11, likedBy: [3, 4, 5], comments: [{ id: 110, user: USERS[7], text: 'Farlington is so good for kingfishers this time of year.' }], timestamp: '6h ago' },
  { id: 10, community: 'Birdwatching', category: 'Outdoor & Nature', user: USERS[7], text: 'Complete beginner here, just got my first pair of binoculars. Where should I go for an easy first outing?', tags: ['beginner', 'question'], likes: 5, likedBy: [2, 6], comments: [{ id: 111, user: USERS[2], text: 'Farlington Marshes RSPB hide. Easy paths, tons of birds, and the hide means you can sit and watch.' }], timestamp: '1d ago' },
  { id: 11, community: 'Photography', category: 'Outdoor & Nature', user: USERS[4], text: 'Golden hour at the Round Tower yesterday was incredible. The light across the harbour entrance was something else.', tags: ['motivation'], likes: 13, likedBy: [1, 2, 5], comments: [{ id: 112, user: USERS[5], text: 'Old Portsmouth at sunset is unbeatable.' }], timestamp: '10h ago' },
  { id: 12, community: 'Photography', category: 'Outdoor & Nature', user: USERS[5], text: 'I have only ever used my phone camera. Is it worth getting a proper camera or should I just learn composition first?', tags: ['beginner', 'question'], likes: 6, likedBy: [4, 7], comments: [{ id: 113, user: USERS[4], text: 'Learn composition first! Phone cameras are incredible now. Gear is less important than seeing light.' }], timestamp: '12h ago' },
  { id: 13, community: 'Woodworking', category: 'Making & Crafting', user: USERS[1], text: 'Finished my first dovetail joint today. Took ages and it is not perfect but it actually holds together. Buzzing.', tags: ['motivation'], likes: 9, likedBy: [3, 5, 6], comments: [{ id: 114, user: USERS[5], text: 'First dovetail is always the hardest. They get addictive after that.' }], timestamp: '5h ago' },
  { id: 14, community: 'Woodworking', category: 'Making & Crafting', user: USERS[6], text: 'What tools would you recommend for a complete beginner? Got about fifty quid to spend.', tags: ['beginner', 'question'], likes: 4, likedBy: [1, 2], comments: [{ id: 115, user: USERS[1], text: 'A decent chisel set, a small tenon saw, and a marking gauge will get you started. Check Portsmouth MakerSpace too.' }], timestamp: '1d ago' },
  { id: 15, community: 'Ceramics & Pottery', category: 'Making & Crafting', user: USERS[4], text: 'Got my glazes back from the kiln at The Clay Studio. The ash glaze on my bowl turned out beautifully.', tags: ['motivation'], likes: 10, likedBy: [2, 3, 6], comments: [{ id: 116, user: USERS[5], text: 'Ash glaze is gorgeous. What cone did you fire at?' }, { id: 117, user: USERS[4], text: 'Cone 6 reduction, the gas kiln really helps.' }], timestamp: '3h ago' },
  { id: 16, community: 'Ceramics & Pottery', category: 'Making & Crafting', user: USERS[7], text: 'Never touched clay before but really want to try. Are the taster sessions at The Clay Studio any good?', tags: ['beginner', 'question'], likes: 6, likedBy: [4, 5], comments: [{ id: 118, user: USERS[4], text: 'Brilliant! Really relaxed atmosphere and they walk you through everything.' }], timestamp: '2d ago' },
  { id: 17, community: 'Electronics & Soldering', category: 'Making & Crafting', user: USERS[5], text: 'Built my first Raspberry Pi weather station this weekend. Temperature and humidity logging to a little OLED screen. Next step: web dashboard!', tags: ['motivation'], likes: 8, likedBy: [1, 2], comments: [{ id: 119, user: USERS[1], text: 'Love it! Are you using Python for the data logging?' }], timestamp: '4h ago' },
  { id: 18, community: 'Electronics & Soldering', category: 'Making & Crafting', user: USERS[6], text: 'Want to learn soldering from scratch. Any kits you would recommend for an absolute beginner?', tags: ['beginner', 'question'], likes: 5, likedBy: [5, 8], comments: [{ id: 120, user: USERS[5], text: 'Elegoo starter kits on Amazon are great. Comes with everything including a practice board.' }], timestamp: '1d ago' },
]

const ALL_SUBCOMMUNITIES = CATEGORIES.flatMap(c => c.subcommunities.map(s => s.name))

function MemberStack({ count }) {
  return (
    <div className="flex items-center">
      <span className="text-xs text-gray-400">{count} members</span>
    </div>
  )
}

function TagPill({ tag, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
        selected ? 'bg-sage-special text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      }`}
    >
      #{tag}
    </button>
  )
}

function PostTag({ tag }) {
  return (
    <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-sage-special font-medium">
      #{tag}
    </span>
  )
}

function UserInitial({ name, size = 'md' }) {
  const initial = name?.charAt(0).toUpperCase() || '?'
  const sizeClasses = size === 'sm'
    ? 'w-6 h-6 text-xs'
    : 'w-8 h-8 text-sm'
  return (
    <span className={`${sizeClasses} rounded-full bg-sage-special/10 text-sage-special font-semibold flex items-center justify-center flex-shrink-0`}>
      {initial}
    </span>
  )
}

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCommunity, setSelectedCommunity] = useState('All')
  const [selectedTag, setSelectedTag] = useState(null)
  const [joinedCommunities, setJoinedCommunities] = useState(['Climbing & Bouldering', 'Electronics & Soldering'])
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [newPostText, setNewPostText] = useState('')
  const [newPostTags, setNewPostTags] = useState([])
  const [newPostCommunity, setNewPostCommunity] = useState('')
  const [expandedComments, setExpandedComments] = useState({})
  const [newCommentText, setNewCommentText] = useState({})
  const postInputRef = useRef(null)

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' ||
        post.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.community.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
      const matchesCommunity = selectedCommunity === 'All' || post.community === selectedCommunity
      const matchesTag = !selectedTag || post.tags.includes(selectedTag)
      return matchesSearch && matchesCategory && matchesCommunity && matchesTag
    })
  }, [posts, searchQuery, selectedCategory, selectedCommunity, selectedTag])

  const visibleSubcommunities = useMemo(() => {
    if (selectedCategory === 'All') return ALL_SUBCOMMUNITIES
    const cat = CATEGORIES.find(c => c.name === selectedCategory)
    return cat ? cat.subcommunities.map(s => s.name) : ALL_SUBCOMMUNITIES
  }, [selectedCategory])

  const handleJoinToggle = (communityName) => {
    setJoinedCommunities(prev =>
      prev.includes(communityName)
        ? prev.filter(c => c !== communityName)
        : [...prev, communityName]
    )
  }

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post
      const alreadyLiked = post.likedBy.includes(CURRENT_USER.id)
      const likedBy = alreadyLiked
        ? post.likedBy.filter(id => id !== CURRENT_USER.id)
        : [...post.likedBy, CURRENT_USER.id]
      return { ...post, likedBy, likes: likedBy.length }
    }))
  }

  const handleAddPost = () => {
    if (!newPostText.trim() || !newPostCommunity) return
    const category = CATEGORIES.find(c =>
      c.subcommunities.some(s => s.name === newPostCommunity)
    )
    const newPost = {
      id: Date.now(),
      community: newPostCommunity,
      category: category?.name || '',
      user: CURRENT_USER,
      text: newPostText.trim(),
      tags: newPostTags,
      likes: 0,
      likedBy: [],
      comments: [],
      timestamp: 'Just now',
    }
    setPosts(prev => [newPost, ...prev])
    setNewPostText('')
    setNewPostTags([])
    setNewPostCommunity('')
  }

  const handleTogglePostTag = (tag) => {
    setNewPostTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const handleAddComment = (postId) => {
    const text = newCommentText[postId]?.trim()
    if (!text) return
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post
      return {
        ...post,
        comments: [...post.comments, { id: Date.now(), user: CURRENT_USER, text }],
      }
    }))
    setNewCommentText(prev => ({ ...prev, [postId]: '' }))
  }

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }))
  }

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName)
    setSelectedCommunity('All')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Community</h1>
          <p className="text-sm text-gray-500 mt-1">Find your people. Share your progress. Ask anything.</p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search posts, people, communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage-special placeholder-gray-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600">
              Clear
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <button
            onClick={() => handleCategorySelect('All')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${selectedCategory === 'All' ? 'bg-sage-special text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.name}
              onClick={() => handleCategorySelect(cat.name)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${selectedCategory === cat.name ? 'bg-sage-special text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Subcommunity Filter */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <button
            onClick={() => setSelectedCommunity('All')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${selectedCommunity === 'All' ? 'bg-sage-special text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200'}`}
          >
            All groups
          </button>
          {visibleSubcommunities.map(name => (
            <button
              key={name}
              onClick={() => setSelectedCommunity(name)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${selectedCommunity === name ? 'bg-sage-special text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200'}`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Tag Filter */}
        <div className="flex gap-2 mb-6">
          {TAGS.map(tag => (
            <TagPill
              key={tag}
              tag={tag}
              selected={selectedTag === tag}
              onClick={() => setSelectedTag(prev => prev === tag ? null : tag)}
            />
          ))}
        </div>

        {/* Community Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {(selectedCategory === 'All'
            ? CATEGORIES.flatMap(c => c.subcommunities)
            : CATEGORIES.find(c => c.name === selectedCategory)?.subcommunities || []
          )
            .filter(sub => selectedCommunity === 'All' || sub.name === selectedCommunity)
            .map(sub => {
              const isJoined = joinedCommunities.includes(sub.name)
              return (
                <div key={sub.name} className="rounded-lg border border-gray-200 p-4 bg-white hover:shadow-sm transition-shadow">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">{sub.name}</h3>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">{sub.description}</p>
                  <MemberStack count={sub.members} />
                  <button
                    onClick={() => handleJoinToggle(sub.name)}
                    className={`mt-3 w-full py-1.5 rounded-md text-xs font-medium transition-colors ${isJoined ? 'bg-sage-special text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'}`}
                  >
                    {isJoined ? 'Joined' : 'Join'}
                  </button>
                </div>
              )
            })}
        </div>

        {/* New Post Composer */}
        <div className="rounded-lg border border-gray-200 p-4 mb-6 bg-white">
          <div className="flex items-start gap-3">
            <UserInitial name={CURRENT_USER.name} />
            <div className="flex-1">
              <textarea
                ref={postInputRef}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Share something with the community..."
                rows={2}
                className="w-full resize-none outline-none text-sm text-gray-900 placeholder-gray-400 leading-relaxed"
                onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleAddPost() }}
              />
              <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                <select
                  value={newPostCommunity}
                  onChange={(e) => setNewPostCommunity(e.target.value)}
                  className="text-xs border border-gray-200 rounded-md px-2 py-1.5 text-gray-600 focus:outline-none focus:ring-1 focus:ring-sage-special bg-white"
                >
                  <option value="">Post to...</option>
                  {joinedCommunities.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                {TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTogglePostTag(tag)}
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${newPostTags.includes(tag) ? 'bg-sage-special text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                  >
                    #{tag}
                  </button>
                ))}
                <div className="flex-1" />
                <span className="text-xs text-gray-400 hidden sm:inline">
                  {newPostText.length > 0 ? 'Ctrl+Enter to post' : ''}
                </span>
                <button
                  onClick={handleAddPost}
                  disabled={!newPostText.trim() || !newPostCommunity}
                  className={`px-4 py-1.5 rounded-md text-xs font-medium text-white transition-colors ${newPostText.trim() && newPostCommunity ? 'bg-sage-special hover:opacity-90 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-400">No posts match your filters.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedCommunity('All'); setSelectedTag(null) }}
                className="text-sm text-sage-special font-medium mt-2 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {filteredPosts.map(post => {
            const isLiked = post.likedBy.includes(CURRENT_USER.id)
            const commentsOpen = expandedComments[post.id]

            return (
              <div key={post.id} className="rounded-lg border border-gray-200 p-4 bg-white hover:shadow-sm transition-shadow">

                {/* Post header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <UserInitial name={post.user.name} />
                    <div>
                      <span className="text-sm font-semibold text-gray-900">{post.user.name}</span>
                      <span className="text-xs text-gray-400 ml-2">{post.timestamp}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedCommunity(post.community); setSelectedCategory(post.category) }}
                    className="px-2 py-1 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-xs text-gray-500 font-medium">{post.community}</span>
                  </button>
                </div>

                {/* Post body */}
                <p className="text-sm text-gray-700 leading-relaxed">{post.text}</p>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex gap-1.5 mt-2">
                    {post.tags.map(tag => <PostTag key={tag} tag={tag} />)}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-5 mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <svg className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {post.likes > 0 && post.likes}
                  </button>
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    {post.comments.length > 0 ? `${post.comments.length} comment${post.comments.length !== 1 ? 's' : ''}` : 'Comment'}
                  </button>
                </div>

                {/* Comments */}
                {commentsOpen && (
                  <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
                    {post.comments.map(comment => (
                      <div key={comment.id} className="flex items-start gap-2">
                        <UserInitial name={comment.user.name} size="sm" />
                        <div>
                          <span className="text-xs font-semibold text-gray-900">{comment.user.name}</span>
                          <p className="text-xs text-gray-500 mt-0.5">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 mt-1">
                      <UserInitial name={CURRENT_USER.name} size="sm" />
                      <input
                        type="text"
                        value={newCommentText[post.id] || ''}
                        onChange={(e) => setNewCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                        placeholder="Write a comment..."
                        className="flex-1 text-xs py-1.5 px-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-sage-special placeholder-gray-400"
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id) }}
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="text-xs font-medium text-white px-3 py-1.5 rounded-md bg-sage-special hover:opacity-90 transition-colors"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}