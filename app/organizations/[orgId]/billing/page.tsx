import { requireRole } from '@/lib/rbac/guards';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

interface BillingPageProps {
  params: {
    orgId: string;
  };
}

export default async function BillingPage({ params }: BillingPageProps) {
  // Require owner role for billing access
  await requireRole({
    orgId: params.orgId,
    roles: ['owner'],
    fallbackPath: `/organizations/${params.orgId}`,
  });

  // Get organization details
  const organization = await db.organization.findUnique({
    where: { id: params.orgId },
    select: {
      id: true,
      name: true,
      slug: true,
      memberships: {
        select: { id: true },
      },
    },
  });

  if (!organization) {
    notFound();
  }

  const memberCount = organization.memberships.length;
  const basePrice = 10; // $10 per user per month
  const monthlyTotal = memberCount * basePrice;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
                <p className="text-sm text-gray-500">{organization.name}</p>
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

        {/* Current Plan */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Current Plan</h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Professional Plan</h3>
                  <p className="text-gray-600">Full access with unlimited features</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">${monthlyTotal}</div>
                  <div className="text-sm text-gray-500">per month</div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Check</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {memberCount} users × ${basePrice}/month
              </div>
            </div>
          </div>
        </div>

        {/* Billing Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Dollar sign</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Monthly Bill</dt>
                    <dd className="text-lg font-medium text-gray-900">${monthlyTotal}</dd>
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
                    <title>Calendar</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Next Billing</dt>
                    <dd className="text-lg font-medium text-gray-900">Nov 1, 2025</dd>
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
                    <title>Credit card</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Payment Method</dt>
                    <dd className="text-lg font-medium text-gray-900">•••• 4242</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
              <button
                type="button"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Update
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Credit card</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">Visa ending in 4242</div>
                  <div className="text-sm text-gray-500">Expires 12/2027</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Billing History</h2>
            
            <div className="space-y-3">
              {[
                { date: 'Oct 1, 2025', amount: monthlyTotal, status: 'Paid', invoice: 'INV-001' },
                { date: 'Sep 1, 2025', amount: monthlyTotal, status: 'Paid', invoice: 'INV-002' },
                { date: 'Aug 1, 2025', amount: monthlyTotal, status: 'Paid', invoice: 'INV-003' },
              ].map((billing) => (
                <div key={billing.invoice} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{billing.invoice}</div>
                      <div className="text-sm text-gray-500">{billing.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-medium text-gray-900">${billing.amount}</div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {billing.status}
                    </span>
                    <button
                      type="button"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Usage & Analytics */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Usage Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Current Period Usage</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Users</span>
                    <span className="text-sm font-medium text-gray-900">{memberCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">API Calls</span>
                    <span className="text-sm font-medium text-gray-900">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Storage Used</span>
                    <span className="text-sm font-medium text-gray-900">2.4 GB</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Billing Period</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Period Start</span>
                    <span className="text-sm font-medium text-gray-900">Oct 1, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Period End</span>
                    <span className="text-sm font-medium text-gray-900">Oct 31, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Days Remaining</span>
                    <span className="text-sm font-medium text-gray-900">29 days</span>
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