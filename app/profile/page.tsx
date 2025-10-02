import { getSession } from '@keyloom/nextjs'
import { ProfileForm } from '@/components/profile/profile-form'
import { UserButtonComponent } from '@/components/auth/user-button'
import config from '@/keyloom.config'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const { user } = await getSession(config)
  
  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            </div>
            <UserButtonComponent user={user} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <ProfileForm user={user} />
          </div>
        </div>
      </div>
    </div>
  )
}