import { getSession } from '@/lib/auth/session'
import { getUserOrganizations } from '@/lib/rbac/organizations'
import { redirect } from 'next/navigation'
import config from '@/keyloom.config'
import { OrganizationList } from '@/components/organizations/organization-list'

export default async function DashboardPage() {
  const { session, user } = await getSession(config)
  
  if (!session || !user) {
    redirect('/sign-in')
  }

  const organizations = await getUserOrganizations(user.id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/profile"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Profile
              </a>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Welcome,</span>
                <span className="text-sm font-medium text-gray-900">
                  {user.email?.split('@')[0] || 'User'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-6 py-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Welcome back, {user.email?.split('@')[0] || 'User'}!
              </h2>
              <p className="text-gray-600">
                Manage your organizations, access role-based features, and collaborate with your team.
              </p>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Demo Role Access Cards */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Member access</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Member Area</h3>
                    <p className="text-sm text-gray-500">General access for all authenticated users</p>
                  </div>
                </div>
                <div className="mt-4">
                  <a
                    href="/demo/member"
                    className="text-sm font-medium text-green-600 hover:text-green-500"
                  >
                    Access Member Area →
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Admin access</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Admin Demo</h3>
                    <p className="text-sm text-gray-500">Try admin features (demo only)</p>
                  </div>
                </div>
                <div className="mt-4">
                  <a
                    href="/demo/admin"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Try Admin Features →
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Owner access</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Owner Demo</h3>
                    <p className="text-sm text-gray-500">Experience owner privileges (demo only)</p>
                  </div>
                </div>
                <div className="mt-4">
                  <a
                    href="/demo/owner"
                    className="text-sm font-medium text-purple-600 hover:text-purple-500"
                  >
                    Try Owner Features →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Organizations Section */}
          <OrganizationList organizations={organizations.map(org => ({ 
            ...org, 
            slug: org.slug || '',
            role: org.role as 'owner' | 'admin' | 'member'
          }))} />
        </div>
      </div>
    </div>
  )
}

