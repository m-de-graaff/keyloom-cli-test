import { requireRole } from '@/lib/rbac/guards';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface UsersPageProps {
  params: {
    orgId: string;
  };
}

export default async function UsersPage({ params }: UsersPageProps) {
  // Require admin or owner role for user management
  const { role } = await requireRole({
    orgId: params.orgId,
    roles: ['admin', 'owner'],
    fallbackPath: `/organizations/${params.orgId}`,
  });

  // Get organization with members
  const organization = await db.organization.findUnique({
    where: { id: params.orgId },
    include: {
      memberships: {
        include: { user: { select: { id: true, email: true, name: true, image: true } } },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!organization) {
    notFound();
  }

  const memberCount = organization.memberships.length;
  const ownerCount = organization.memberships.filter(m => m.role === 'owner').length;
  const adminCount = organization.memberships.filter(m => m.role === 'admin').length;
  const regularMemberCount = organization.memberships.filter(m => m.role === 'member').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-sm text-gray-500">{organization.name}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  role === 'owner' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {role}
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Users</title>
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
                  <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Crown</title>
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

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Shield</title>
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
                  <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Users</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Members</dt>
                    <dd className="text-lg font-medium text-gray-900">{regularMemberCount}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Actions</h2>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Invite Members
              </button>
            </div>
          </div>
        </div>

        {/* Members List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Organization Members</h2>
            
            <div className="space-y-3">
              {organization.memberships.map((membership) => (
                <div key={membership.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {membership.user.image ? (
                        <Image
                          className="h-10 w-10 rounded-full"
                          src={membership.user.image}
                          alt={membership.user.name || membership.user.email || 'User'}
                          width={40}
                          height={40}
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {(membership.user.name || membership.user.email || 'U').charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
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
                    
                    {/* Role management buttons */}
                    {role === 'owner' && membership.role !== 'owner' && (
                      <div className="flex space-x-2">
                        <select className="text-xs border border-gray-300 rounded px-2 py-1">
                          <option value={membership.role}>{membership.role}</option>
                          {membership.role !== 'admin' && <option value="admin">admin</option>}
                          {membership.role !== 'member' && <option value="member">member</option>}
                        </select>
                        <button
                          type="button"
                          className="text-xs text-red-600 hover:text-red-800 focus:outline-none"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    
                    {role === 'admin' && membership.role === 'member' && (
                      <button
                        type="button"
                        className="text-xs text-red-600 hover:text-red-800 focus:outline-none"
                      >
                        Remove
                      </button>
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
  );
}