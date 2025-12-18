import { useState } from 'react'
import { Download, FileText, Calendar } from 'lucide-react'

export default function Reports() {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  // TODO: Fetch from SmartSuite
  const reports: Array<{
    id: string
    workerName: string
    moduleTitle: string
    completedAt: string
    score: number
  }> = []

  const handleExport = () => {
    // TODO: Generate CSV/PDF export
    console.log('Exporting:', { dateFrom, dateTo })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Compliance Reports</h1>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

      {reports.length === 0 ? (
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
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3">{report.workerName}</td>
                  <td className="px-4 py-3 text-gray-600">{report.moduleTitle}</td>
                  <td className="px-4 py-3 text-gray-600">{report.completedAt}</td>
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
