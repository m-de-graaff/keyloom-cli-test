'use client'

import { Card } from '@/components/ui/card'
import { SignUpForm, Providers } from '@keyloom/ui/auth'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-6">Create your account</h1>
        
        <Providers callbackUrl="/dashboard" />
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        {/* Email/Password Form */}
        <SignUpForm redirectTo="/dashboard" />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link 
              href="/sign-in" 
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}