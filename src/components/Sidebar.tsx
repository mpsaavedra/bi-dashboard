'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  
  if (!user) return null
  
  // Get available reports for the user
  const availableReports = [
    { id: 'sales', name: 'Sales Report' },
    { id: 'inventory', name: 'Inventory Report' }
  ].filter(report => 
    user.role === 'admin' || user.reports.includes(report.id)
  )

  return (
    <aside className="w-64 border-r h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="font-semibold mb-4">Reports</h2>
        <nav className="space-y-1">
          {availableReports.map(report => {
            const isActive = pathname === `/report/${report.id}`
            return (
              <Link
                key={report.id}
                href={`/report/${report.id}`}
                className={`block p-2 rounded-md ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-muted'
                }`}
              >
                {report.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}