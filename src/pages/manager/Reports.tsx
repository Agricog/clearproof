import { useEffect, useState } from 'react'
import { Download, FileText, Calendar, Loader } from 'lucide-react'
import { api } from '../../services/api'

interface Verification {
  id: string
  worker_name?: string
  module_title?: string
  completed_at: string
  score: number
  passed: boolean
}

export default function Reports() {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [reports, setReports] = useState<Verification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await api.verifications.list()
        setReports(res.items || [])
      } catch (error) {
        console.error('Failed to fetch reports:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  const filteredReports = reports.filter((report) => {
    if (!dateFrom && !dateTo) return true
    const completedAt = new Date(report.completed_at)
    if (dateFrom && completedAt < new Date(dateFrom)) return false
    if (dateTo && completedAt > new Date(dateTo + 'T23:59:59')) return false
    return true
  })

  const handleExport = () => {
    const csv = [
      ['Worker', 'Module', 'Completed', 'Score', 'Passed'].join(','),
      ...filteredReports.map((r) =>
        [
          r.worker_name || 'Unknown',
          r.module_title || 'Unknown',
          new Date(r.completed_at).toLocaleString(),
          `${r.score}%`,
          r.passed ? 'Yes' : 'No'
        ].join(',')
      )
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `clearproof-report-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
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
        <h1 className="text-2xl font-bold text-gray-900">Compliance Reports</h1>
        <button
          onClick={handleExport}
          disabled={filteredReports.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Download size={18} />
          Export
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <FileText className="mx-auto text-gray-400 mb-3" size={32} />
          <p className="text-gray-600">No verification records yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Worker</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Module</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Completed</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3">{report.worker_name || 'Unknown'}</td>
                  <td className="px-4 py-3 text-gray-600">{report.module_title || 'Unknown'}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(report.completed_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={report.score >= 80 ? 'text-green-600' : 'text-amber-600'}>
                      {report.score}%
                    </span>
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
