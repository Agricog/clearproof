import { Outlet } from 'react-router-dom'

export default function WorkerLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="text-lg font-bold text-blue-600">ClearProof</div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 px-4 py-3 text-center text-sm text-gray-500">
        If in doubt, ask your supervisor
      </footer>
    </div>
  )
}
