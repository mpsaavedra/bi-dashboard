'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'

type User = {
  id: string
  username: string
  name: string
  role: 'admin' | 'user'
  companyId?: string
  reports: string[]
  password?: string
}

type Company = {
  id: string
  name: string
}

export default function AdminPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [newUser, setNewUser] = useState<Partial<User>>({
    username: '',
    name: '',
    role: 'user',
    reports: [],
    password: ''
  })
  const [newCompany, setNewCompany] = useState<Partial<Company>>({
    name: ''
  })

  useEffect(() => {
    // Load users and companies from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]')
    setUsers(storedUsers)
    setCompanies(storedCompanies)
  }, [])

  const saveData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
  }

  const handleAddUser = () => {
    if (!newUser.username || !newUser.name || !newUser.password) return
    
    const updatedUsers = [
      ...users,
      {
        ...newUser,
        id: `user-${Date.now()}`,
        reports: newUser.reports || []
      } as User
    ]
    
    setUsers(updatedUsers)
    saveData('users', updatedUsers)
    setNewUser({
      username: '',
      name: '',
      role: 'user',
      reports: [],
      password: ''
    })
  }

  const handleAddCompany = () => {
    if (!newCompany.name) return
    
    const updatedCompanies = [
      ...companies,
      {
        ...newCompany,
        id: `company-${Date.now()}`
      } as Company
    ]
    
    setCompanies(updatedCompanies)
    saveData('companies', updatedCompanies)
    setNewCompany({ name: '' })
  }

  const handleDeleteUser = (id: string) => {
    const updatedUsers = users.filter(u => u.id !== id)
    setUsers(updatedUsers)
    saveData('users', updatedUsers)
  }

  const handleDeleteCompany = (id: string) => {
    const updatedCompanies = companies.filter(c => c.id !== id)
    setCompanies(updatedCompanies)
    saveData('companies', updatedCompanies)
  }

  if (!user || user.role !== 'admin') {
    return <div>Access denied</div>
  }

  return (
    <>
      <Header />
      <div className="pt-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Users Management */}
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Email"
                  value={newUser.username}
                  onChange={e => setNewUser({...newUser, username: e.target.value})}
                  className="p-2 border rounded"
                />
                <input
                  placeholder="Name"
                  value={newUser.name}
                  onChange={e => setNewUser({...newUser, name: e.target.value})}
                  className="p-2 border rounded"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={e => setNewUser({...newUser, password: e.target.value})}
                  className="p-2 border rounded"
                />
                <select
                  value={newUser.role}
                  onChange={e => setNewUser({...newUser, role: e.target.value as 'admin' | 'user'})}
                  className="p-2 border rounded"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Assign Reports:</p>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={newUser.reports?.includes('sales')}
                      onChange={e => {
                        const reports = [...(newUser.reports || [])]
                        if (e.target.checked) {
                          reports.push('sales')
                        } else {
                          const index = reports.indexOf('sales')
                          if (index > -1) reports.splice(index, 1)
                        }
                        setNewUser({...newUser, reports})
                      }}
                    />
                    Sales
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={newUser.reports?.includes('inventory')}
                      onChange={e => {
                        const reports = [...(newUser.reports || [])]
                        if (e.target.checked) {
                          reports.push('inventory')
                        } else {
                          const index = reports.indexOf('inventory')
                          if (index > -1) reports.splice(index, 1)
                        }
                        setNewUser({...newUser, reports})
                      }}
                    />
                    Inventory
                  </label>
                </div>
              </div>
              
              <button
                onClick={handleAddUser}
                className="w-full text-primary-foreground p-2 rounded bg-green-600 hover:bg-green-500"
              >
                Add User
              </button>
            </div>
            
            <div className="space-y-2">
              {users.map(user => (
                <div key={user.id} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.username}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-destructive"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Companies Management */}
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Companies</h2>
            
            <div className="space-y-4 mb-6">
              <input
                placeholder="Company Name"
                value={newCompany.name}
                onChange={e => setNewCompany({...newCompany, name: e.target.value})}
                className="w-full p-2 border rounded"
              />
              
              <button
                onClick={handleAddCompany}
                className="w-full text-primary-foreground p-2 rounded bg-green-600 hover:bg-green-500"
              >
                Add Company
              </button>
            </div>
            
            <div className="space-y-2">
              {companies.map(company => (
                <div key={company.id} className="flex justify-between items-center p-2 border rounded">
                  <p className="font-medium">{company.name}</p>
                  <button
                    onClick={() => handleDeleteCompany(company.id)}
                    className="text-destructive"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}