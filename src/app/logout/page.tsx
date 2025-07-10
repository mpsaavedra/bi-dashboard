import Link from 'next/link'

export default function LogoutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">You have been logged out</h1>
        <p className="text-muted-foreground">Thank you for using the BI Dashboard</p>
        <Link 
          href="/login" 
          className="inline-block mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </div>
  )
}