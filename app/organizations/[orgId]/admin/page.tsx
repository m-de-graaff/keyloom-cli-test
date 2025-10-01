import { guard } from '@keyloom/nextjs'
import { getUserRole } from '@/lib/rbac/helpers'
import config from '@/keyloom.config'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

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

  // Check admin role
  const userRole = await getUserRole(result.user.id, params.orgId)
  if (!userRole || !['owner', 'admin'].includes(userRole)) {
    throw new Error('Insufficient permissions')
  }
  
  const organization = await db.organization.findUnique({
    where: { id: params.orgId },
    include: {
      memberships: {
        include: {
          user: { select: { id: true, email: true, name: true } },
        },
      },
    },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Admin Panel - {organization?.name}
        </h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Organization Members
            </h2>
            
            {organization?.memberships.map((membership) => (
              <div key={membership.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {membership.user.name || membership.user.email}
                  </h3>
                  <p className="text-sm text-gray-500">{membership.user.email}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  membership.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                  membership.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {membership.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}