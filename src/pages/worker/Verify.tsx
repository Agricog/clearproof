import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Globe, ChevronRight, CheckCircle } from 'lucide-react'

type Step = 'language' | 'content' | 'questions' | 'complete'

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

export default function Verify() {
  const { moduleId: _moduleId } = useParams()
  const [step, setStep] = useState<Step>('language')
  const [_selectedLanguage, setSelectedLanguage] = useState('')

  // TODO: Fetch module content from SmartSuite using moduleId
  // TODO: Get translated content from Claude API

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
                setStep('content')
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

  if (step === 'content') {
    return (
      <div>
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Safety Information</h1>
        
        {/* TODO: Replace with actual translated content */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-gray-700 leading-relaxed">
            [Translated safety content will appear here, broken into clear sections by Claude]
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

        {/* TODO: Replace with actual comprehension questions from Claude */}
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
          onClick={() => setStep('complete')}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit
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
