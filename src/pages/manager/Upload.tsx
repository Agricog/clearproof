import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload as UploadIcon, FileText, X, Loader } from 'lucide-react'
import { api } from '../../services/api'

const API_URL = import.meta.env.VITE_API_URL || 'https://api.clearproof.co.uk'

export default function Upload() {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !title) return

    setUploading(true)
    setError('')
    setStatus('Parsing file...')

    try {
      // Upload file to backend for parsing
      const formData = new FormData()
      formData.append('file', file)

      const token = await window.Clerk?.session?.getToken()
      const uploadRes = await fetch(`${API_URL}/api/modules/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      if (!uploadRes.ok) {
        const err = await uploadRes.json()
        throw new Error(err.error || 'Failed to parse file')
      }

      const { content } = await uploadRes.json()
      
      setStatus('Creating module...')
      const module = await api.modules.create({
        title,
        original_content: content,
        file_name: file.name,
        status: 'processing'
      })

      setStatus('Processing with AI...')
      await api.process.transform(module.id)

      setStatus('Complete!')
      navigate('/dashboard/modules')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload. Please try again.')
      console.error(err)
    } finally {
      setUploading(false)
      setStatus('')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Upload Content</h1>

      <form onSubmit={handleSubmit} className="max-w-xl">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Module Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Site Induction, Working at Height RAMS"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={uploading}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document
          </label>
          
          {!file ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <UploadIcon className="mx-auto text-gray-400 mb-3" size={32} />
              <p className="text-gray-600 mb-2">Drag and drop your file here, or</p>
              <label className="inline-block px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                Browse Files
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.txt"
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">PDF or TXT up to 10MB</p>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <FileText className="text-blue-600" size={20} />
              <span className="flex-1 truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-gray-400 hover:text-gray-600"
                disabled={uploading}
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!file || !title || uploading}
          className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <Loader className="animate-spin" size={18} />
              {status}
            </>
          ) : (
            'Upload & Process'
          )}
        </button>
      </form>
    </div>
  )
}
