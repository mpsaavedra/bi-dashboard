'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      const success = await login(username, password)
      if (success) {
        router.push('/report/sales')
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('An error occurred during login')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/3">
          <img src="/bg-login.jpeg" alt="BI Logo" className="w-full h-full" />
        </div>
        <div className="w-2/3 pl-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold">BI Dashboard Login</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Test credentials: <br />
              technology@kameleonlabs.ai  <b>#4nrsHSre1#@uPC$3ZR8</b>
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 pr-10 pb-4">
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Email
              </label>
              <input
                id="username"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}