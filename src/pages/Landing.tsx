import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  Shield, 
  Globe, 
  ClipboardCheck, 
  FileSearch, 
  Upload, 
  QrCode, 
  CheckCircle,
  Building2,
  HardHat,
  Truck,
  Factory,
  ArrowRight,
  Mail
} from 'lucide-react'

export default function Landing() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ClearProof",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Multilingual health and safety comprehension verification platform for construction, manufacturing and logistics industries.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "GBP",
      "description": "Free trial available"
    },
    "provider": {
      "@type": "Organization",
      "name": "ClearProof",
      "url": "https://clearproof.co.uk",
      "email": "hello@clearproof.co.uk"
    },
    "featureList": [
      "90+ languages supported",
      "AI-powered comprehension testing",
      "HSE-ready audit trails",
      "QR code access",
      "RAMS and safety document processing"
    ]
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>ClearProof - Multilingual Safety Comprehension Verification</title>
        <meta name="description" content="Verify workers truly understood your safety content. AI-powered comprehension testing in 90+ languages with HSE-ready audit trails for construction, manufacturing and logistics." />
        <link rel="canonical" href="https://clearproof.co.uk" />
        
        {/* Open Graph */}
        <meta property="og:title" content="ClearProof - Proof They Understood Your Safety Content" />
        <meta property="og:description" content="Multilingual health and safety comprehension verification. AI-powered testing in 90+ languages with HSE-ready audit trails." />
        <meta property="og:url" content="https://clearproof.co.uk" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ClearProof" />
        <meta property="og:locale" content="en_GB" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ClearProof - Multilingual Safety Comprehension Verification" />
        <meta name="twitter:description" content="Verify workers truly understood your safety content. AI-powered comprehension testing in 90+ languages." />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="safety compliance, HSE, health and safety, multilingual safety training, RAMS, construction safety, worker comprehension, safety verification, audit trail" />
        <meta name="author" content="ClearProof" />
        <meta name="geo.region" content="GB" />
        <html lang="en-GB" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="text-xl font-bold text-blue-600">ClearProof</div>
        <nav className="flex items-center gap-6" aria-label="Main navigation">
          <a href="#features" className="text-gray-600 hover:text-gray-900 hidden sm:block">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 hidden sm:block">How It Works</a>
          <Link to="/pricing" className="text-gray-600 hover:text-gray-900 hidden sm:block">Pricing</Link>
          <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Sign In
          </Link>
        </nav>
      </header>

      <main>
        <section className="max-w-5xl mx-auto px-6 py-20 text-center" aria-labelledby="hero-heading">
          <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Proof They Understood Your Safety Content
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Multilingual health and safety comprehension verification. Deliver safety content in any language, verify true understanding with AI-powered questions, and maintain HSE-ready audit trails.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/login" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Start Free Trial
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              See How It Works
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" aria-hidden="true" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" aria-hidden="true" />
              Setup in minutes
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" aria-hidden="true" />
              HSE compliant
            </span>
          </div>
        </section>

        <section id="features" className="bg-gray-50 py-20" aria-labelledby="features-heading">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 id="features-heading" className="text-3xl font-bold text-gray-900 mb-4">
                Everything You Need for Safety Compliance
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stop relying on signatures that prove nothing. Get real proof your workers understood the safety content.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <article className="bg-white p-6 rounded-xl border border-gray-200">
                <Globe className="text-blue-600 mb-4" size={32} aria-hidden="true" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">90+ Languages Supported</h3>
                <p className="text-gray-600">
                  Workers receive safety content automatically translated and simplified in their native language. No more language barriers compromising safety understanding.
                </p>
              </article>
              <article className="bg-white p-6 rounded-xl border border-gray-200">
                <ClipboardCheck className="text-blue-600 mb-4" size={32} aria-hidden="true" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Real Comprehension Testing</h3>
                <p className="text-gray-600">
                  AI-generated scenario-based questions test actual understanding, not just reading ability. No more tick-box exercises that prove nothing.
                </p>
              </article>
              <article className="bg-white p-6 rounded-xl border border-gray-200">
                <FileSearch className="text-blue-600 mb-4" size={32} aria-hidden="true" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">HSE-Ready Audit Trails</h3>
                <p className="text-gray-600">
                  Complete records of what each worker received, in which language, their answers, scores, and timestamps. Ready for any inspection.
                </p>
              </article>
              <article className="bg-white p-6 rounded-xl border border-gray-200">
                <Shield className="text-blue-600 mb-4" size={32} aria-hidden="true" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Content, Your Control</h3>
                <p className="text-gray-600">
                  Upload your existing RAMS, method statements, site inductions, and procedures. Our AI transforms them into clear, testable content.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20" aria-labelledby="how-it-works-heading">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 id="how-it-works-heading" className="text-3xl font-bold text-gray-900 mb-4">
                How ClearProof Works
              </h2>
              <p className="text-lg text-gray-600">
                Three simple steps to verified safety comprehension
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="text-blue-600" size={28} aria-hidden="true" />
                </div>
                <div className="text-sm font-medium text-blue-600 mb-2">Step 1</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Content</h3>
                <p className="text-gray-600">
                  Upload your safety documents including RAMS, inductions, and procedures. PDF or text formats supported.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="text-blue-600" size={28} aria-hidden="true" />
                </div>
                <div className="text-sm font-medium text-blue-600 mb-2">Step 2</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Share QR Code</h3>
                <p className="text-gray-600">
                  Print the QR code and display on site. Workers scan with their phone with no app download needed.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-blue-600" size={28} aria-hidden="true" />
                </div>
                <div className="text-sm font-medium text-blue-600 mb-2">Step 3</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Verified Proof</h3>
                <p className="text-gray-600">
                  Workers read content in their language, answer questions, and you get timestamped proof of comprehension.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="industries" className="bg-gray-50 py-20" aria-labelledby="industries-heading">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 id="industries-heading" className="text-3xl font-bold text-gray-900 mb-4">
                Built for Safety-Critical Industries
              </h2>
              <p className="text-lg text-gray-600">
                Trusted by teams who cannot afford miscommunication
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <HardHat className="text-blue-600 mx-auto mb-3" size={32} aria-hidden="true" />
                <h3 className="font-semibold text-gray-900">Construction</h3>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <Factory className="text-blue-600 mx-auto mb-3" size={32} aria-hidden="true" />
                <h3 className="font-semibold text-gray-900">Manufacturing</h3>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <Truck className="text-blue-600 mx-auto mb-3" size={32} aria-hidden="true" />
                <h3 className="font-semibold text-gray-900">Logistics</h3>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <Building2 className="text-blue-600 mx-auto mb-3" size={32} aria-hidden="true" />
                <h3 className="font-semibold text-gray-900">Facilities</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20" aria-labelledby="cta-heading">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 id="cta-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Prove They Understood?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Start verifying safety comprehension today. Free to try, no credit card required.
            </p>
            <Link to="/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg">
              Get Started Free
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold text-white mb-4">ClearProof</div>
              <p className="text-sm">
                Multilingual safety comprehension verification for safety-critical industries.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Mail size={14} aria-hidden="true" />
                  <a href="mailto:hello@clearproof.co.uk" className="hover:text-white transition-colors">hello@clearproof.co.uk</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            <p>© {new Date().getFullYear()} ClearProof. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
