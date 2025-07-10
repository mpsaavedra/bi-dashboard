'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts'

type ReportData = {
  id: string
  name: string
  cards: {
    total: number
    average: number
  }
  line: Array<{
    date: string
    value: number
  }>
  bar: Array<{
    category: string
    value: number
  }>
}

export default function ReportPage() {
  const { reportId } = useParams<{ reportId: string }>()
  const { user } = useAuth()
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Check if user has access to this report
        if (user && user.role !== 'admin' && !user.reports.includes(reportId as string)) {
          setError('You do not have access to this report')
          setLoading(false)
          return
        }
        
        const response = await fetch('/data/reports.json')
        if (!response.ok) {
          throw new Error('Failed to fetch reports')
        }
        
        const data = await response.json()
        const foundReport = data.reports.find((r: ReportData) => r.id === reportId)
        
        if (!foundReport) {
          setError('Report not found')
        } else {
          setReport(foundReport)
        }
      } catch (err) {
        setError('An error occurred while fetching the report')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    if (reportId) {
      fetchReport()
    }
  }, [reportId, user])

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>
  }

  if (error) {
    return <div className="text-destructive">{error}</div>
  }

  if (!report) {
    return <div>Report not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{report.name}</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total</h3>
          <p className="text-2xl font-bold">{report.cards.total.toLocaleString()}</p>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Average</h3>
          <p className="text-2xl font-bold">{report.cards.average.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium mb-4">Time Series</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={report.line}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Bar Chart */}
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium mb-4">Category Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={report.bar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Raw Data */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Raw Data</h2>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Time Series Data</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                {report.line.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{item.date}</td>
                    <td className="py-2 px-4">{item.value.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Category Data</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                {report.bar.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{item.category}</td>
                    <td className="py-2 px-4">{item.value.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
