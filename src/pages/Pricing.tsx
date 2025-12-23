import { Link } from 'react-router-dom'
import { Check, ArrowLeft } from 'lucide-react'

const tiers = [
  {
    name: 'Free',
    price: '£0',
    period: 'forever',
    description: 'Try ClearProof with no commitment',
    features: [
      '1 module',
      '10 verifications/month',
      'PDF & TXT upload',
      'AI content transformation',
      '10 languages',
      'Basic audit trail',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Starter',
    price: '£39',
    period: '/month',
    description: 'For small sites and contractors',
    features: [
      '5 modules',
      '100 verifications/month',
      'PDF & TXT upload',
      'AI content transformation',
      '10 languages',
      'Full audit trail',
      'QR code downloads',
      'CSV export',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '£99',
    period: '/month',
    description: 'For growing construction firms',
    features: [
      '20 modules',
      '500 verifications/month',
      'PDF & TXT upload',
      'AI content transformation',
      '10 languages',
      'Full audit trail',
      'QR code downloads',
      'CSV export',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '£249',
    period: '/month',
    description: 'For large multi-site operations',
    features: [
      '50 modules',
      '2,000 verifications/month',
      'PDF & TXT upload',
      'AI content transformation',
      '10 languages',
      'Full audit trail',
      'QR code downloads',
      'CSV export',
      'Priority support',
      'Dedicated account manager',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-blue-600">ClearProof</Link>
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft size={18} />
          Back to home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your site. All plans include AI-powered content transformation and multilingual support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl border p-6 flex flex-col ${
                tier.highlighted
                  ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {tier.highlighted && (
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                  Most Popular
                </div>
              )}
              <h2 className="text-xl font-bold text-gray-900">{tier.name}</h2>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                <span className="text-gray-600">{tier.period}</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">{tier.description}</p>
              
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-green-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={tier.name === 'Enterprise' ? 'mailto:hello@clearproof.co.uk' : '/login'}
                className={`block text-center py-2 px-4 rounded-lg font-medium transition-colors ${
                  tier.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need more verifications?
          </h2>
          <p className="text-gray-600 mb-4">
            Additional verifications available at £0.15 each beyond your plan limit.
          </p>
          
            href="mailto:hello@clearproof.co.uk"
            className="text-blue-600 hover:underline font-medium"
          >
            Contact us for custom volumes
          </a>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">What counts as a verification?</h3>
              <p className="text-gray-600 text-sm">
                A verification is counted when a worker completes the comprehension test for a module. Reading content without completing questions does not count.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Can I change plans?</h3>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade at any time. Changes take effect on your next billing cycle.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600 text-sm">
                Yes, all paid plans include a 14-day free trial. No credit card required to start.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">How long are records kept?</h3>
              <p className="text-gray-600 text-sm">
                All verification records are retained for 6 years minimum to support HSE compliance requirements.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm">
          <p>© {new Date().getFullYear()} ClearProof. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
