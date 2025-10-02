import { requireAuth } from '@/lib/rbac/guards';
import { getUserRole } from '@/lib/rbac/helpers';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { RoleGuard, PermissionGuard } from '@/lib/rbac/guards';

interface OrganizationPageProps {
  params: {
    orgId: string;
  };
}

export default async function OrganizationPage({ params }: OrganizationPageProps) {
  const { user } = await requireAuth();
  
  // Get organization details
  const organization = await db.organization.findUnique({
    where: { id: params.orgId },
    include: {
      memberships: {
        include: { user: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!organization) {
    notFound();
  }

  // Get user's role in this organization
  const userRole = await getUserRole(user.id, params.orgId);

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You are not a member of this organization.</p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const memberCount = organization.memberships.length;
  const ownerCount = organization.memberships.filter(m => m.role === 'owner').length;
  const adminCount = organization.memberships.filter(m => m.role === 'admin').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-medium text-xl">
                    {organization.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">{organization.name}</h1>
                  <p className="text-sm text-gray-500">/{organization.slug}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  userRole === 'owner' ? 'bg-purple-100 text-purple-800' :
                  userRole === 'admin' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {userRole}
                </span>
                <a
                  href="/dashboard"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  ← Back to Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Users icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a2.01 2.01 0 000-5.197z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Members</dt>
                    <dd className="text-lg font-medium text-gray-900">{memberCount}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Shield icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Admins</dt>
                    <dd className="text-lg font-medium text-gray-900">{adminCount}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Star icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Owners</dt>
                    <dd className="text-lg font-medium text-gray-900">{ownerCount}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4">
            <nav className="flex space-x-8">
              <a
                href={`/organizations/${params.orgId}`}
                className="border-indigo-500 text-indigo-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
              >
                Overview
              </a>
              
              <RoleGuard userRole={userRole} requiredRoles={['admin', 'owner']}>
                <a
                  href={`/organizations/${params.orgId}/users`}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                >
                  Manage Users
                </a>
              </RoleGuard>

              <RoleGuard userRole={userRole} requiredRoles={['owner']}>
                <a
                  href={`/organizations/${params.orgId}/admin`}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                >
                  Admin Panel
                </a>
              </RoleGuard>

              <PermissionGuard userRole={userRole} permission="manage:billing">
                <a
                  href={`/organizations/${params.orgId}/billing`}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                >
                  Billing
                </a>
              </PermissionGuard>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Organization Overview</h2>
            
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Welcome to {organization.name}! You have {userRole} access to this organization.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Your Permissions</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ View organization dashboard</li>
                    <li>✓ Access member resources</li>
                    {userRole === 'admin' || userRole === 'owner' ? (
                      <>
                        <li>✓ Manage users and invitations</li>
                        <li>✓ Access administrative features</li>
                      </>
                    ) : null}
                    {userRole === 'owner' ? (
                      <>
                        <li>✓ Full organization management</li>
                        <li>✓ Billing and subscription access</li>
                        <li>✓ Delete organization</li>
                      </>
                    ) : null}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md border"
                    >
                      View Recent Activity
                    </button>
                    
                    <RoleGuard userRole={userRole} requiredRoles={['admin', 'owner']}>
                      <button
                        type="button"
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md border"
                      >
                        Invite New Members
                      </button>
                    </RoleGuard>

                    <RoleGuard userRole={userRole} requiredRoles={['owner']}>
                      <button
                        type="button"
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md border"
                      >
                        Organization Settings
                      </button>
                    </RoleGuard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}