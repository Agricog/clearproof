import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Globe, ChevronRight, CheckCircle, Loader, AlertCircle } from 'lucide-react'
import { api } from '../../services/api'

type Step = 'language' | 'info' | 'content' | 'questions' | 'complete'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'pl', name: 'Polski' },
  { code: 'ro', name: 'Română' },
  { code: 'pt', name: 'Português' },
  { code: 'es', name: 'Español' },
  { code: 'uk', name: 'Українська' },
  { code: 'lt', name: 'Lietuvių' },
  { code: 'bg', name: 'Български' },
  { code: 'hu', name: 'Magyar' },
  { code: 'hi', name: 'हिन्दी' },
]

interface Module {
  id: string
  title: string
  processed_content?: string
  questions?: string
}

export default function Verify() {
  const { moduleId } = useParams()
  const [step, setStep] = useState<Step>('language')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [workerName, setWorkerName] = useState('')
  const [workerId, setWorkerId] = useState('')
  const [module, setModule] = useState<Module | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function fetchModule() {
      if (!moduleId) return
      try {
        const data = await api.modules.get(moduleId)
        setModule(data)
      } catch (err) {
        setError('Module not found')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchModule()
  }, [moduleId])

  const handleComplete = async () => {
    setSubmitting(true)
    try {
      await api.verifications.create({
        module_id: moduleId,
        worker_name: workerName,
        worker_id: workerId,
        language_used: selectedLanguage,
        score: 100,
        passed: true,
        completed_at: new Date().toISOString()
      })
      setStep('complete')
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin text-blue-600" size={32} />
      </div>
    )
  }

  if (error || !module) {
    return (
      <div className="text-center">
        <AlertCircle className="mx-auto text-red-500 mb-3" size={32} />
        <p className="text-gray-600">{error || 'Module not found'}</p>
      </div>
    )
  }

  if (step === 'language') {
    return (
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Globe className="text-blue-600" size={24} />
          <h1 className="text-xl font-semibold text-gray-900">Select Your Language</h1>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelectedLanguage(lang.code)
                setStep('info')
              }}
              className="px-4 py-3 text-left bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (step === 'info') {
    return (
      <div>
        <h1 className="text-xl font-semibold text-gray-900 mb-6">Your Details</h1>

        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={workerName}
              onChange={(e) => setWorkerName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="workerId" className="block text-sm font-medium text-gray-700 mb-1">
              Worker ID / Badge Number
            </label>
            <input
              id="workerId"
              type="text"
              value={workerId}
              onChange={(e) => setWorkerId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          onClick={() => setStep('content')}
          disabled={!workerName || !workerId}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Continue
          <ChevronRight size={18} />
        </button>
      </div>
    )
  }

  if (step === 'content') {
    return (
      <div>
        <h1 className="text-xl font-semibold text-gray-900 mb-4">{module.title}</h1>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-gray-700 leading-relaxed">
            {module.processed_content || '[Content will be translated and displayed here]'}
          </p>
        </div>

        <button
          onClick={() => setStep('questions')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          I've read this
          <ChevronRight size={18} />
        </button>
      </div>
    )
  }

  if (step === 'questions') {
    return (
      <div>
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Check Your Understanding</h1>

        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <p className="font-medium text-gray-900 mb-3">
            [Scenario-based question will appear here]
          </p>
          <div className="flex flex-col gap-2">
            <button className="px-4 py-3 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              Option A
            </button>
            <button className="px-4 py-3 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              Option B
            </button>
            <button className="px-4 py-3 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              Option C
            </button>
          </div>
        </div>

        <button
          onClick={handleComplete}
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
        >
          {submitting ? (
            <>
              <Loader className="animate-spin" size={18} />
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="text-green-600" size={32} />
      </div>
      <h1 className="text-xl font-semibold text-gray-900 mb-2">Verified</h1>
      <p className="text-gray-600">Your comprehension has been recorded. You may now proceed.</p>
    </div>
  )
}
