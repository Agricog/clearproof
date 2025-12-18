import { Link } from 'react-router-dom'
import { Upload, Users, CheckCircle, AlertTriangle } from 'lucide-react'

export default function Dashboard() {
  // TODO: Replace with real data from SmartSuite
  const stats = {
    modules: 0,
    workers: 0,
    verified: 0,
    pending: 0,
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Upload className="text-blue-600" size={20} />
            <span className="text-sm text-gray-600">Modules</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.modules}</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-blue-600" size={20} />
            <span className="text-sm text-gray-600">Workers</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.workers}</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="text-green-600" size={20} />
            <span className="text-sm text-gray-600">Verified</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.verified}</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-amber-600" size={20} />
            <span className="text-sm text-gray-600">Pending</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <p className="text-gray-600 mb-4">Get started by uploading your first H&S document</p>
        <Link
          to="/dashboard/upload"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload size={18} />
          Upload Content
        </Link>
      </div>
    </div>
  )
}
