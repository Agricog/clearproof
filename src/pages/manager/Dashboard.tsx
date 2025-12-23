import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Upload, Users, CheckCircle, AlertTriangle, CreditCard, Zap } from 'lucide-react'
import { api } from '../../services/api'

interface Subscription {
  plan: string
  status: string
  limits: { modules: number; verifications: number }
  usage: { modules: number; verifications: number }
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    modules: 0,
    workers: 0,
    verified: 0,
    pending: 0,
  })
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [modulesRes, workersRes, verificationsRes, subRes] = await Promise.all([
          api.modules.list(),
          api.workers.list(),
          api.verifications.list(),
          api.billing.getSubscription()
        ])

        const verifications = verificationsRes.items || []
        const verified = verifications.filter((v: { passed?: boolean }) => v.passed).length

        setStats({
          modules: modulesRes.items?.length || 0,
          workers: workersRes.items?.length || 0,
          verified,
          pending: verifications.length - verified,
        })
        setSubscription(subRes)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleManageBilling = async () => {
    try {
      const result = await api.billing.createPortal()
      if (result.url) {
        window.location.href = result.url
      }
    } catch (error) {
      console.error('Failed to open billing portal:', error)
    }
  }

  const planName = subscription?.plan 
    ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1) 
    : 'Free'

  const modulesUsed = stats.modules
  const modulesLimit = subscription?.limits.modules || 1
  const verificationsUsed = subscription?.usage.verifications || 0
  const verificationsLimit = subscription?.limits.verifications || 10

  const modulesPercent = Math.min((modulesUsed / modulesLimit) * 100, 100)
  const verificationsPercent = Math.min((verificationsUsed / verificationsLimit) * 100, 100)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Plan & Usage Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CreditCard className="text-blue-600" size={24} />
            <div>
              <h2 className="font-semibold text-gray-900">{planName} Plan</h2>
              <p className="text-sm text-gray-500">
                {subscription?.plan === 'free' ? 'Upgrade for more modules and verifications' : 'Active subscription'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {subscription?.plan !== 'free' && (
              <button
                onClick={handleManageBilling}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Manage Billing
              </button>
            )}
            {subscription?.plan === 'free' && (
              <Link
                to="/pricing"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Zap size={16} />
                Upgrade
              </Link>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Modules</span>
              <span className="font-medium">{modulesUsed} / {modulesLimit}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${modulesPercent >= 90 ? 'bg-red-500' : modulesPercent >= 70 ? 'bg-amber-500' : 'bg-blue-600'}`}
                style={{ width: `${modulesPercent}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Verifications this month</span>
              <span className="font-medium">{verificationsUsed} / {verificationsLimit}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${verificationsPercent >= 90 ? 'bg-red-500' : verificationsPercent >= 70 ? 'bg-amber-500' : 'bg-blue-600'}`}
                style={{ width: `${verificationsPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Upload className="text-blue-600" size={20} />
            <span className="text-sm text-gray-600">Modules</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {loading ? '—' : stats.modules}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-blue-600" size={20} />
            <span className="text-sm text-gray-600">Workers</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {loading ? '—' : stats.workers}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="text-green-600" size={20} />
            <span className="text-sm text-gray-600">Verified</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {loading ? '—' : stats.verified}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-amber-600" size={20} />
            <span className="text-sm text-gray-600">Pending</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {loading ? '—' : stats.pending}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <p className="text-gray-600 mb-4">Get started by uploading your first H&S document</p>
        <Link
          to="/dashboard/upload"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload size={18} />
          Upload Content
        </Link>
      </div>
    </div>
  )
}
