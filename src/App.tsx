import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import AuthInit from './components/AuthInit'
import ManagerLayout from './components/layouts/ManagerLayout'
import WorkerLayout from './components/layouts/WorkerLayout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Dashboard from './pages/manager/Dashboard'
import Upload from './pages/manager/Upload'
import Modules from './pages/manager/Modules'
import Reports from './pages/manager/Reports'
import Verify from './pages/worker/Verify'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut><RedirectToSignIn /></SignedOut>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthInit />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        
        <Route element={<ProtectedRoute><ManagerLayout /></ProtectedRoute>}>
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
