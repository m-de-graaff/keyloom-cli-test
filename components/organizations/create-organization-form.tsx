'use client';

import { useState } from 'react';

interface CreateOrganizationFormProps {
  onSuccess?: () => void;
}

export function CreateOrganizationForm({ onSuccess }: CreateOrganizationFormProps) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generate slug from name
  const handleNameChange = (value: string) => {
    setName(value);
    if (!slug || slug === generateSlug(name)) {
      setSlug(generateSlug(value));
    }
  };

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/organizations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim() || generateSlug(name.trim()),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to create organization' }));
        throw new Error(errorData.error || 'Failed to create organization');
      }

      const result = await response.json();
      
      // Reset form
      setName('');
      setSlug('');
      
      if (onSuccess) {
        onSuccess();
      } else {
        // Redirect to the new organization
        window.location.href = `/organizations/${result.organization.id}`;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create organization');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="org-name" className="block text-sm font-medium text-gray-700">
          Organization Name *
        </label>
        <input
          type="text"
          id="org-name"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          required
          placeholder="My Organization"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="org-slug" className="block text-sm font-medium text-gray-700">
          Organization Slug *
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            yourapp.com/org/
          </span>
          <input
            type="text"
            id="org-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="my-organization"
            pattern="^[a-z0-9-]+$"
            className="block w-full px-3 py-2 border border-gray-300 rounded-none rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Only lowercase letters, numbers, and hyphens are allowed. Must be unique.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading || !name.trim() || !slug.trim()}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating Organization...' : 'Create Organization'}
      </button>
    </form>
  );
}