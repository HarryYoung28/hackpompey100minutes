import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-sage-special bg-sage-special">
      
      {/* Logo */}
      <Link href="/home" className="text-xl font-semibold tracking-tight text-white">
        100Minutes
      </Link>

      {/* Links */}
      <div className="flex items-center gap-8">
        <Link href="/home" className="text-sm font-medium text-white hover:opacity-70 transition-opacity">
          Home
        </Link>
        <Link href="/activities" className="text-sm font-medium text-white hover:opacity-70 transition-opacity">
          Activities
        </Link>
        <Link href="/community" className="text-sm font-medium text-white hover:opacity-70 transition-opacity">
          Community
        </Link>
        <Link
          href="/login"
          className="text-sm font-medium px-4 py-2 rounded-full bg-white transition-colors hover:bg-opacity-90 text-sage-special"
        >
          Login
        </Link>
      </div>

    </nav>
  )
}   