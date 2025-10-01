import { getSession } from '@/lib/auth/session'
import { getUserOrganizations } from '@/lib/rbac/organizations'
import { redirect } from 'next/navigation'
import config from '@/keyloom.config'
import { OrganizationCard } from '@/components/auth/organization-card'

export default async function DashboardPage() {
  const { session, user } = await getSession(config)
  
  if (!session || !user) {
    redirect('/sign-in')
  }

  const organizations = await getUserOrganizations(user.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Welcome back, {user.email}!
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.map((org) => (
              <OrganizationCard key={org.id} organization={org} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

