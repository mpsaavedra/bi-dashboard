import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen pt-14">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </>
  )
}