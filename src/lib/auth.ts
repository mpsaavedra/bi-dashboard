import 'server-only'
import { cookies } from 'next/headers'

// Simple auth verification function
export async function verifyAuth() {
  const authCookie = cookies().get('auth')?.value
  
  if (!authCookie) {
    return { isAuthenticated: false, user: null }
  }
  
  try {
    const userData = JSON.parse(authCookie)
    return { isAuthenticated: true, user: userData }
  } catch (error) {
    return { isAuthenticated: false, user: null }
  }
}