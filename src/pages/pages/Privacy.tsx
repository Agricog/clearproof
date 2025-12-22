import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-blue-600">ClearProof</Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft size={18} />
          Back to home
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              ClearProof ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our health and safety comprehension verification platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 mb-4">We collect information that you provide directly to us:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Account information (name, email address) for site managers</li>
              <li>Worker identification (name, worker ID/badge number)</li>
              <li>Verification records (answers, scores, timestamps, language preferences)</li>
              <li>Uploaded health and safety documents</li>
              <li>IP addresses for audit and security purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Provide and maintain our verification services</li>
              <li>Generate comprehension reports and audit trails</li>
              <li>Process and translate safety content</li>
              <li>Improve our AI-powered question generation</li>
              <li>Ensure platform security and prevent abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Retention</h2>
            <p className="text-gray-600 mb-4">
              We retain verification records and audit logs for a minimum of 6 years to support HSE compliance requirements. You may request deletion of your account data at any time, subject to our legal retention obligations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organisational measures to protect your data, including encryption in transit (TLS), secure authentication, rate limiting, and regular security assessments.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Third-Party Services</h2>
            <p className="text-gray-600 mb-4">We use the following third-party services:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Clerk (authentication)</li>
              <li>Anthropic Claude (AI content processing)</li>
              <li>SmartSuite (data storage)</li>
              <li>Railway (hosting)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
            <p className="text-gray-600 mb-4">Under UK GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Access your personal data</li>
              <li>Rectify inaccurate data</li>
              <li>Request erasure (subject to legal retention requirements)</li>
              <li>Restrict or object to processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              For any privacy-related questions or to exercise your rights, contact us at:{' '}
              <a href="mailto:hello@clearproof.co.uk" className="text-blue-600 hover:underline">hello@clearproof.co.uk</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
