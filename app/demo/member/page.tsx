import { requireAuth } from '@/lib/rbac/guards';

export default async function MemberDemoPage() {
  // Only require authentication - all authenticated users can access
  const { user } = await requireAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Member Area</h1>
                <p className="text-sm text-gray-500">Accessible to all authenticated users</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Member Access
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

        {/* Content */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Welcome to the Member Area</h2>
              <p className="text-gray-600 mb-4">
                This is a demo page that shows content accessible to all authenticated users. 
                Any user who has signed in can view this page.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Your Access Level</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Check</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    View member content
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Check</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Access basic features
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Check</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Profile management
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>X</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Admin features
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>X</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Owner privileges
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">User Information</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <div>
                    <span className="font-medium">Email:</span> {user.email}
                  </div>
                  <div>
                    <span className="font-medium">User ID:</span> {user.id}
                  </div>
                  <div>
                    <span className="font-medium">Access Level:</span> Authenticated Member
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Available Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href="/profile"
                  className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900">Manage Profile</h4>
                  <p className="text-sm text-gray-500 mt-1">Update your account information</p>
                </a>
                
                <a
                  href="/dashboard"
                  className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900">Dashboard</h4>
                  <p className="text-sm text-gray-500 mt-1">View your organizations</p>
                </a>
                
                <div className="block p-4 border border-gray-200 rounded-lg bg-gray-50 opacity-50">
                  <h4 className="font-medium text-gray-500">Premium Features</h4>
                  <p className="text-sm text-gray-400 mt-1">Requires higher access level</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}