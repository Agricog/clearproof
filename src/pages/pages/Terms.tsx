import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
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

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing or using ClearProof, you agree to be bound by these Terms of Service. If you do not agree, do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-4">
              ClearProof provides a multilingual health and safety comprehension verification platform. We transform safety documents, generate comprehension questions, and maintain audit trails for compliance purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">You agree to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Provide accurate information when creating an account</li>
              <li>Maintain the security of your account credentials</li>
              <li>Only upload content you have the right to use</li>
              <li>Use the service in compliance with applicable laws</li>
              <li>Not attempt to circumvent security measures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Content Ownership</h2>
            <p className="text-gray-600 mb-4">
              You retain ownership of all health and safety documents you upload. By uploading content, you grant us a limited licence to process, transform, and translate that content solely for providing our services to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Service Limitations</h2>
            <p className="text-gray-600 mb-4">
              ClearProof is a verification tool and does not replace professional health and safety advice. You remain responsible for ensuring your safety content is accurate, complete, and compliant with regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. AI-Generated Content</h2>
            <p className="text-gray-600 mb-4">
              Our service uses AI to simplify content, generate translations, and create comprehension questions. While we strive for accuracy, you should review AI-generated content before deployment and report any errors.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Data and Compliance</h2>
            <p className="text-gray-600 mb-4">
              We maintain verification records to support your HSE compliance requirements. However, you are responsible for determining whether our service meets your specific regulatory obligations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              To the maximum extent permitted by law, ClearProof shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Termination</h2>
            <p className="text-gray-600 mb-4">
              We may suspend or terminate your access to the service at any time for violation of these terms. You may cancel your account at any time by contacting us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Governing Law</h2>
            <p className="text-gray-600 mb-4">
              These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Contact</h2>
            <p className="text-gray-600 mb-4">
              Questions about these terms? Contact us at:{' '}
              <a href="mailto:hello@clearproof.co.uk" className="text-blue-600 hover:underline">hello@clearproof.co.uk</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
