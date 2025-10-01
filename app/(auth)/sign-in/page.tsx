import { SignInForm, Providers } from '@keyloom/ui/auth'
import { Card } from '@keyloom/ui/components/card'

export const metadata = { title: 'Sign In' }

export default function SignInPage() {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-6">Welcome back</h1>
        
        {/* OAuth Providers (auto-configured by CLI) */}
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
        <SignInForm redirectTo="/dashboard" />
      </Card>
    </div>
  )
}