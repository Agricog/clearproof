import { SignIn } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Link to="/" className="text-2xl font-bold text-blue-600 mb-8">
        ClearProof
      </Link>

      <SignIn 
        routing="hash"
        afterSignInUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-none border border-gray-200'
          }
        }}
      />
    </div>
  )
}
