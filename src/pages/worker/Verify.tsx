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

interface Section {
  title: string
  content: string
  critical: boolean
}

interface Question {
  scenario: string
  question: string
  options: string[]
  correctIndex: number
}

interface Module {
  id: string
  title: string
  sde7e5250a?: string  // processed_content field ID
  sceb501715?: string  // questions field ID
}

export default function Verify() {
  const { moduleId } = useParams()
  const [step, setStep] = useState<Step>('language')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [workerName, setWorkerName] = useState('')
  const [workerId, setWorkerId] = useState('')
  const [module, setModule] = useState<Module | null>(null)
  const [sections, setSections] = useState<Section[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<number[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [score, setScore] = useState(0)

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

  const handleLanguageSelect = async (langCode: string) => {
    setSelectedLanguage(langCode)
    setStep('info')
  }

  const handleInfoSubmit = async () => {
    if (!module?.sde7e5250a) {
      setError('Module content not ready')
      return
    }

    setProcessing(true)
    try {
      let content = module.sde7e5250a

      if (selectedLanguage !== 'en') {
        const translated = await api.process.translate(content, selectedLanguage)
        content = translated.translated
      }

      try {
        const parsed = JSON.parse(content)
        setSections(parsed.sections || [])
      } catch {
        setSections([{ title: 'Safety Information', content, critical: false }])
      }

      setStep('content')
    } catch (err) {
      setError('Failed to load content')
      console.error(err)
    } finally {
      setProcessing(false)
    }
  }

  const handleContentComplete = async () => {
    setProcessing(true)
    try {
      const contentForQuestions = sections.map(s => `${s.title}: ${s.content}`).join('\n\n')
      const langName = languages.find(l => l.code === selectedLanguage)?.name || 'English'
      const result = await api.process.questions(contentForQuestions, langName)
      
      try {
        const parsed = JSON.parse(result.questions)
        setQuestions(parsed.questions || [])
        setAnswers(new Array(parsed.questions?.length || 0).fill(-1))
      } catch {
        setError('Failed to parse questions')
      }

      setStep('questions')
    } catch (err) {
      setError('Failed to generate questions')
      console.error(err)
    } finally {
      setProcessing(false)
    }
  }

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleComplete = async () => {
    setSubmitting(true)
    try {
      const correct = answers.filter((a, i) => a === questions[i].correctIndex).length
      const calculatedScore = Math.round((correct / questions.length) * 100)
      setScore(calculatedScore)

      await api.verifications.create({
        module_id: moduleId,
        worker_name: workerName,
        worker_id: workerId,
        language_used: selectedLanguage,
        answers: JSON.stringify(answers),
        score: calculatedScore,
        passed: calculatedScore >= 80,
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
              onClick={() => handleLanguageSelect(lang.code)}
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
              disabled={processing}
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
              disabled={processing}
              required
            />
          </div>
        </div>

        <button
          onClick={handleInfoSubmit}
          disabled={!workerName || !workerId || processing}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {processing ? (
            <>
              <Loader className="animate-spin" size={18} />
              Loading content...
            </>
          ) : (
            <>
              Continue
              <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>
    )
  }

  if (step === 'content') {
    return (
      <div>
        <h1 className="text-xl font-semibold text-gray-900 mb-4">{module.title}</h1>
        
        <div className="space-y-4 mb-6">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className={`bg-white border rounded-lg p-4 ${
                section.critical ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
            >
              <h2 className="font-semibold text-gray-900 mb-2">{section.title}</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{section.content}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleContentComplete}
          disabled={processing}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
        >
          {processing ? (
            <>
              <Loader className="animate-spin" size={18} />
              Preparing questions...
            </>
          ) : (
            <>
              I've read this
              <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>
    )
  }

  if (step === 'questions' && questions.length > 0) {
    const q = questions[currentQuestion]
    const isLast = currentQuestion === questions.length - 1
    const hasAnswered = answers[currentQuestion] !== -1

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Check Your Understanding</h1>
          <span className="text-sm text-gray-500">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-gray-600 mb-2 text-sm italic">{q.scenario}</p>
          <p className="font-medium text-gray-900 mb-4">{q.question}</p>
          <div className="flex flex-col gap-2">
            {q.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`px-4 py-3 text-left border rounded-lg transition-colors ${
                  answers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {isLast ? (
          <button
            onClick={handleComplete}
            disabled={!hasAnswered || submitting}
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
        ) : (
          <button
            onClick={handleNext}
            disabled={!hasAnswered}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
          >
            Next
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
        score >= 80 ? 'bg-green-100' : 'bg-amber-100'
      }`}>
        <CheckCircle className={score >= 80 ? 'text-green-600' : 'text-amber-600'} size={32} />
      </div>
      <h1 className="text-xl font-semibold text-gray-900 mb-2">
        {score >= 80 ? 'Verified' : 'Not Passed'}
      </h1>
      <p className="text-gray-600 mb-2">Score: {score}%</p>
      <p className="text-gray-600">
        {score >= 80 
          ? 'Your comprehension has been recorded. You may now proceed.'
          : 'Please speak with your supervisor for additional training.'}
      </p>
    </div>
  )
}
