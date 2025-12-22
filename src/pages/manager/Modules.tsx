import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Users, ExternalLink, Upload, Loader, QrCode } from 'lucide-react'
import { api } from '../../services/api'

const API_URL = import.meta.env.VITE_API_URL || 'https://api.clearproof.co.uk'

interface Module {
  id: string
  title: string
  created_at: string
  worker_count?: number
  verified_count?: number
}

export default function Modules() {
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchModules() {
      try {
        const res = await api.modules.list()
        setModules(res.items || [])
      } catch (error) {
        console.error('Failed to fetch modules:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchModules()
  }, [])

  const handleDownloadQR = (moduleId: string, title: string) => {
    const link = document.createElement('a')
    link.href = `${API_URL}/api/modules/${moduleId}/qr`
    link.download = `qr-${title.replace(/\s+/g, '-').toLowerCase()}.png`
    link.click()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin text-blue-600" size={32} />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Modules</h1>
        <Link
          to="/dashboard/upload"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload size={18} />
          New Module
        </Link>
      </div>

      {modules.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <FileText className="mx-auto text-gray-400 mb-3" size={32} />
          <p className="text-gray-600 mb-4">No modules yet</p>
          <Link
            to="/dashboard/upload"
            className="text-blue-600 hover:underline"
          >
            Upload your first document
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Title</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Created</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Workers</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Verified</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="text-gray-400" size={18} />
                      {module.title}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {module.created_at ? new Date(module.created_at).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users size={16} />
                      {module.worker_count || 0}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-green-600">{module.verified_count || 0}</span>
                    <span className="text-gray-400"> / {module.worker_count || 0}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleDownloadQR(module.id, module.title)}
                        className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm"
                        title="Download QR Code"
                      >
                        <QrCode size={16} />
                      </button>
                      <Link
                        to={`/verify/${module.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
                      >
                        Worker Link
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
