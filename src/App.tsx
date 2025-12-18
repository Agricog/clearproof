import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ManagerLayout from './components/layouts/ManagerLayout'
import WorkerLayout from './components/layouts/WorkerLayout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/manager/Dashboard'
import Upload from './pages/manager/Upload'
import Modules from './pages/manager/Modules'
import Reports from './pages/manager/Reports'
import Verify from './pages/worker/Verify'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<ManagerLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/upload" element={<Upload />} />
          <Route path="/dashboard/modules" element={<Modules />} />
          <Route path="/dashboard/reports" element={<Reports />} />
        </Route>
        
        <Route element={<WorkerLayout />}>
          <Route path="/verify/:moduleId" element={<Verify />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
