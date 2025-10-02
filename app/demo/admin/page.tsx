import { requireAuth } from '@/lib/rbac/guards';

export default async function AdminDemoPage() {
  // Only require authentication for demo purposes
  await requireAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Demo</h1>
                <p className="text-sm text-gray-500">Simulated admin features (demo only)</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Admin Demo
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

        {/* Demo Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <svg className="h-5 w-5 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <title>Warning</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Demo Mode</h3>
              <p className="text-sm text-yellow-700 mt-1">
                This is a demonstration of admin features. In a real organization, you would need admin role to access this content.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Admin Dashboard</h2>
              <p className="text-gray-600 mb-4">
                This page demonstrates the types of features that would be available to users with admin roles in organizations.
              </p>
            </div>

            {/* Admin Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Users</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a2.01 2.01 0 000-5.197z" />
                  </svg>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">User Management</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Manage organization members and their roles</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Invite new members</li>
                  <li>• Modify user roles</li>
                  <li>• Remove members</li>
                  <li>• View member activity</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Settings</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">Configuration</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Configure organization settings and policies</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Organization settings</li>
                  <li>• Access policies</li>
                  <li>• Integration management</li>
                  <li>• Security settings</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="h-8 w-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Analytics</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">Analytics</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">View detailed analytics and reports</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Usage statistics</li>
                  <li>• Performance metrics</li>
                  <li>• Audit logs</li>
                  <li>• Export reports</li>
                </ul>
              </div>
            </div>

            {/* Mock Data Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sample Admin Data</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-gray-500">Total Users</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-sm text-gray-500">Active Projects</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-gray-500">This Month</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">99.8%</div>
                  <div className="text-sm text-gray-500">Uptime</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Recent Admin Actions</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• User john@example.com added to organization</div>
                  <div>• Security settings updated</div>
                  <div>• New API key generated</div>
                  <div>• Backup completed successfully</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}