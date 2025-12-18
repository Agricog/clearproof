import { Link } from 'react-router-dom'
import { Shield, Globe, ClipboardCheck, FileSearch } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="text-xl font-bold text-blue-600">ClearProof</div>
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Proof they understood
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Multilingual H&S comprehension verification. Deliver safety content in any language. Verify understanding. Full audit trail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="flex gap-4">
            <Globe className="text-blue-600 shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">90+ Languages</h3>
              <p className="text-gray-600">Workers receive content in their language, simplified and clear.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <ClipboardCheck className="text-blue-600 shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Comprehension Verified</h3>
              <p className="text-gray-600">Scenario-based questions, not tick-boxes. Real understanding.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <FileSearch className="text-blue-600 shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">HSE-Ready Audit Trail</h3>
              <p className="text-gray-600">Full logs of what they received, understood, and when.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Shield className="text-blue-600 shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Your Content, Protected</h3>
              <p className="text-gray-600">Upload your existing RAMS, inductions, procedures.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  )
}
