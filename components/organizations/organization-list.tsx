'use client';

import { useState } from 'react';

interface Organization {
  id: string;
  name: string;
  slug: string;
  role: 'owner' | 'admin' | 'member';
}

interface OrganizationListProps {
  organizations: Organization[];
}

export function OrganizationList({ organizations }: OrganizationListProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      case 'member':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionsByRole = (role: string) => {
    const actions = ['View Dashboard'];
    
    if (role === 'owner' || role === 'admin') {
      actions.push('Manage Users', 'Settings');
    }
    
    if (role === 'owner') {
      actions.push('Admin Panel', 'Billing');
    }
    
    return actions;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Organizations</h2>
        <button
          type="button"
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {showCreateForm ? 'Cancel' : 'Create Organization'}
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Organization</h3>
          <CreateOrganizationForm onSuccess={() => {
            setShowCreateForm(false);
            window.location.reload();
          }} />
        </div>
      )}

      {organizations.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Organization icon">
              <title>Organization icon</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations yet</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first organization or joining an existing one.</p>
          <button
            type="button"
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Your First Organization
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <div key={org.id} className="bg-white overflow-hidden shadow rounded-lg border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-medium text-lg">
                          {org.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {org.name}
                      </h3>
                      <p className="text-sm text-gray-500">/{org.slug}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(org.role)}`}>
                    {org.role}
                  </span>
                </div>

                <div className="space-y-2">
                  {getActionsByRole(org.role).map((action) => (
                    <a
                      key={action}
                      href={getActionLink(org, action)}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      {action}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getActionLink(org: Organization, action: string): string {
  const baseUrl = `/organizations/${org.id}`;
  
  switch (action) {
    case 'View Dashboard':
      return baseUrl;
    case 'Manage Users':
      return `${baseUrl}/users`;
    case 'Settings':
      return `${baseUrl}/settings`;
    case 'Admin Panel':
      return `${baseUrl}/admin`;
    case 'Billing':
      return `${baseUrl}/billing`;
    default:
      return baseUrl;
  }
}

// Import the CreateOrganizationForm component
import { CreateOrganizationForm } from './create-organization-form';