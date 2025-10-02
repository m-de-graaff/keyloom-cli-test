import { requireAuth } from '@/lib/rbac/guards';
import { CriticalActionsPanel } from '@/components/demo/critical-actions-panel';

export default async function OwnerDemoPage() {
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
                <h1 className="text-2xl font-bold text-gray-900">Owner Demo</h1>
                <p className="text-sm text-gray-500">Simulated owner privileges (demo only)</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Owner Demo
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
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <svg className="h-5 w-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <title>Info</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-purple-800">Owner Demo Mode</h3>
              <p className="text-sm text-purple-700 mt-1">
                This demonstrates the highest level of access. In real organizations, only owners would see these sensitive features.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Owner Control Panel</h2>
              <p className="text-gray-600 mb-4">
                Owners have the highest level of access and control over organizations, including sensitive operations like billing, security, and organization deletion.
              </p>
            </div>

            {/* Owner Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center mb-4">
                  <svg className="h-8 w-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Shield</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">Full Control</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Complete organization ownership and control</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Transfer ownership</li>
                  <li>• Delete organization</li>
                  <li>• Manage all roles</li>
                  <li>• Access audit logs</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <div className="flex items-center mb-4">
                  <svg className="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Credit card</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">Billing Management</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Complete financial control and billing access</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Subscription management</li>
                  <li>• Payment methods</li>
                  <li>• Invoice history</li>
                  <li>• Usage analytics</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                <div className="flex items-center mb-4">
                  <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Exclamation</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">Danger Zone</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Destructive actions that cannot be undone</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Delete organization</li>
                  <li>• Remove all members</li>
                  <li>• Data purging</li>
                  <li>• Account closure</li>
                </ul>
              </div>
            </div>

            {/* Owner Dashboard Stats */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Organization Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">3</div>
                  <div className="text-sm text-gray-500">Organizations</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">47</div>
                  <div className="text-sm text-gray-500">Total Members</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">$2,340</div>
                  <div className="text-sm text-gray-500">Monthly Revenue</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">12</div>
                  <div className="text-sm text-gray-500">Active Projects</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <div className="text-sm text-gray-500">Security Alerts</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Recent Owner Actions</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>• Updated billing information</span>
                      <span className="text-xs text-gray-400">2 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Added new admin role</span>
                      <span className="text-xs text-gray-400">1 day ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Security audit completed</span>
                      <span className="text-xs text-gray-400">3 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Organization settings updated</span>
                      <span className="text-xs text-gray-400">1 week ago</span>
                    </div>
                  </div>
                </div>

                <CriticalActionsPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}