'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-background border-b flex items-center px-4 z-10 bg-indigo-200">
      <div className="flex-1">
        <Link href="/report/sales" className="font-semibold text-lg">
          BI Dashboard
        </Link>
      </div>
      <nav className="flex items-center gap-4 pr-10">
        {user.role === 'admin' && (
          <Link href="/admin" className="text-sm hover:underline">
            Admin
          </Link>
        )}
        <button 
          onClick={logout}
          className="text-sm hover:underline"
        >
          Logout
        </button>
      </nav>
    </header>
  )
}