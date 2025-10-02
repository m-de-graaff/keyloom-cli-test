import { requireRole } from '@/lib/rbac/guards';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

interface SettingsPageProps {
  params: {
    orgId: string;
  };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  // Require admin or owner role for settings access
  const { role } = await requireRole({
    orgId: params.orgId,
    roles: ['admin', 'owner'],
    fallbackPath: `/organizations/${params.orgId}`,
  });

  // Get organization details
  const organization = await db.organization.findUnique({
    where: { id: params.orgId },
    select: {
      id: true,
      name: true,
      slug: true,
      createdAt: true,
      updatedAt: true,
      memberships: {
        select: {
          id: true,
          role: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!organization) {
    notFound();
  }

  const ownerCount = organization.memberships.filter(m => m.role === 'owner').length;
  const adminCount = organization.memberships.filter(m => m.role === 'admin').length;
  const memberCount = organization.memberships.filter(m => m.role === 'member').length;
  const totalMembers = organization.memberships.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Organization Settings</h1>
                <p className="text-sm text-gray-500">{organization.name}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  role === 'owner' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {role === 'owner' ? 'Owner Access' : 'Admin Access'}
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

        {/* Organization Information */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Organization Information</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="org-name" className="block text-sm font-medium text-gray-700">Organization Name</label>
                <input
                  id="org-name"
                  type="text"
                  defaultValue={organization.name}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  disabled
                />
                <p className="mt-1 text-sm text-gray-500">Contact support to change the organization name</p>
              </div>
              
              <div>
                <label htmlFor="org-slug" className="block text-sm font-medium text-gray-700">Organization Slug</label>
                <input
                  id="org-slug"
                  type="text"
                  defaultValue={organization.slug || 'Not set'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  disabled
                />
                <p className="mt-1 text-sm text-gray-500">The slug is used in URLs and cannot be changed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Statistics */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Organization Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Users</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <div className="text-2xl font-bold text-blue-600">{totalMembers}</div>
                    <div className="text-sm text-blue-800">Total Members</div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Crown</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <div className="text-2xl font-bold text-purple-600">{ownerCount}</div>
                    <div className="text-sm text-purple-800">Owners</div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Shield</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <div className="text-2xl font-bold text-green-600">{adminCount}</div>
                    <div className="text-sm text-green-800">Admins</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>User</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <div className="text-2xl font-bold text-gray-600">{memberCount}</div>
                    <div className="text-sm text-gray-800">Members</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Metadata */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Organization Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Basic Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Organization ID</span>
                    <span className="text-sm font-mono text-gray-900">{organization.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Slug</span>
                    <span className="text-sm font-mono text-gray-900">{organization.slug}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Created</span>
                    <span className="text-sm text-gray-900">
                      {new Date(organization.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Additional Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <span className="text-sm text-gray-900">
                      {new Date(organization.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className="text-sm text-gray-900">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Privacy & Security</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Member Visibility</h3>
                  <p className="text-sm text-gray-500">Control who can see organization members</p>
                </div>
                <button
                  type="button"
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  role="switch"
                  aria-checked="true"
                >
                  <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Public Profile</h3>
                  <p className="text-sm text-gray-500">Make organization discoverable publicly</p>
                </div>
                <button
                  type="button"
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  role="switch"
                  aria-checked="false"
                >
                  <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500">Require 2FA for all organization members</p>
                </div>
                <button
                  type="button"
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  role="switch"
                  aria-checked="false"
                >
                  <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone - Only for owners */}
        {role === 'owner' && (
          <div className="bg-white shadow rounded-lg border border-red-200">
            <div className="px-6 py-6">
              <h2 className="text-lg font-medium text-red-900 mb-4">Danger Zone</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Warning</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Delete Organization</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        Once you delete an organization, there is no going back. Please be certain.
                        All data, members, and configurations will be permanently removed.
                      </p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Delete {organization.name}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}