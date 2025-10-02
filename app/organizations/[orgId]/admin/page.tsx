import { guard } from '@keyloom/nextjs'
import { getUserRole } from '@/lib/rbac/helpers'
import config from '@/keyloom.config'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { DeleteOrganizationButton } from '@/components/organizations/delete-organization-button'
import { RemoveMemberButton } from '@/components/organizations/remove-member-button'

interface AdminPageProps {
  params: { orgId: string }
}

export default async function AdminPage({ params }: AdminPageProps) {
  // Use CLI-generated guard
  const result = await guard({
    visibility: 'private',
    redirectTo: '/sign-in'
  }, config)

  // Ensure user exists and has required properties
  if (!result?.user?.id) {
    redirect('/sign-in')
  }

  // Check admin role - require owner for admin panel
  const userRole = await getUserRole(result.user.id, params.orgId)
  if (!userRole || userRole !== 'owner') {
    redirect(`/organizations/${params.orgId}`)
  }
  
  const organization = await db.organization.findUnique({
    where: { id: params.orgId },
    include: {
      memberships: {
        include: {
          user: { select: { id: true, email: true, name: true } },
        },
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!organization) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500">{organization.name} - Owner Controls</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Owner Access
                </span>
                <a
                  href={`/organizations/${params.orgId}`}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  ← Back to Organization
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* User Management */}
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Users management</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a2.01 2.01 0 000-5.197z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">User Management</h3>
                  <p className="text-sm text-gray-500">Manage members, roles, and permissions</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-indigo-600">
                  {organization.memberships.length} total members
                </span>
              </div>
            </div>
          </div>

          {/* Organization Settings */}
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Settings</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Organization Settings</h3>
                  <p className="text-sm text-gray-500">Configure organization details</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-green-600">
                  /{organization.slug}
                </span>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white overflow-hidden shadow rounded-lg border-red-200 border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Warning</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-red-900">Danger Zone</h3>
                  <p className="text-sm text-red-500">Irreversible and destructive actions</p>
                </div>
              </div>
              <div className="mt-4">
                <DeleteOrganizationButton organizationName={organization.name} />
              </div>
            </div>
          </div>
        </div>

        {/* Organization Members */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Organization Members</h2>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Invite Member
              </button>
            </div>
            
            <div className="space-y-3">
              {organization.memberships.map((membership) => (
                <div key={membership.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {(membership.user.name || membership.user.email || 'U').charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {membership.user.name || 'Unknown User'}
                      </h3>
                      <p className="text-sm text-gray-500">{membership.user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      membership.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                      membership.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {membership.role}
                    </span>
                    {membership.role !== 'owner' && (
                      <RemoveMemberButton 
                        userName={membership.user.name} 
                        userEmail={membership.user.email} 
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {organization.memberships.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                No members found in this organization.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}