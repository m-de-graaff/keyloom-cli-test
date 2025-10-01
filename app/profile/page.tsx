import { getSession } from '@keyloom/nextjs'
import { ProfileForm } from '@/components/profile/profile-form'
import config from '@/keyloom.config'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const { user } = await getSession(config)
  
  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-lg font-medium text-gray-900 mb-6">
              Profile Settings
            </h1>
            <ProfileForm user={user} />
          </div>
        </div>
      </div>
    </div>
  )
}