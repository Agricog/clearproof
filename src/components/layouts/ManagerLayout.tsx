import { Outlet, NavLink } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/clerk-react'
import { LayoutDashboard, Upload, FolderOpen, FileText, LogOut } from 'lucide-react'

export default function ManagerLayout() {
  const { signOut } = useClerk()
  const { user } = useUser()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
    }`

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        <div className="text-xl font-bold text-blue-600 mb-8">ClearProof</div>
        
        <nav className="flex flex-col gap-1 flex-1">
          <NavLink to="/dashboard" end className={linkClass}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/upload" className={linkClass}>
            <Upload size={20} />
            Upload Content
          </NavLink>
          <NavLink to="/dashboard/modules" className={linkClass}>
            <FolderOpen size={20} />
            Modules
          </NavLink>
          <NavLink to="/dashboard/reports" className={linkClass}>
            <FileText size={20} />
            Reports
          </NavLink>
        </nav>
        
        <div className="border-t border-gray-200 pt-4">
          {user && (
            <div className="px-4 py-2 text-sm text-gray-600 truncate">
              {user.emailAddresses[0]?.emailAddress}
            </div>
          )}
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>
      
      <main className="flex-1 bg-gray-50 p-8">
        <Outlet />
      </main>
    </div>
  )
}
