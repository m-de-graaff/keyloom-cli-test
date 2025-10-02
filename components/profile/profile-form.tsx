'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/lib/auth/auth-utils';

interface User {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [image, setImage] = useState(user.image || '');
  const [success, setSuccess] = useState(false);

  const { updateProfile, logout, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    try {
      await updateProfile({
        name: name.trim() || null,
        email: email.trim() || null,
        image: image.trim() || null,
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (err) {
      // Error is handled by the useAuth hook
      console.error('Profile update failed:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/sign-in';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex justify-between items-center">
        <a
          href="/dashboard"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          ← Back to Dashboard
        </a>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          Sign Out
        </button>
      </div>

      {/* Account Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Account Information</h3>
        <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
          <div>
            <span className="font-medium">User ID:</span> {user.id}
          </div>
          <div>
            <span className="font-medium">Account Created:</span> {formatDate(user.createdAt)}
          </div>
          <div>
            <span className="font-medium">Last Updated:</span> {formatDate(user.updatedAt)}
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {success && (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Profile updated successfully!
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            This email will be used for account notifications and login.
          </p>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Profile Image URL
          </label>
          <input
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/your-profile-image.jpg"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter a URL to your profile image. Leave empty to remove your current image.
          </p>
        </div>

        {/* Image Preview */}
        {image && (
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-2">
              Image Preview
            </div>
            <div className="flex items-center space-x-4">
              <Image
                src={image}
                alt="Profile preview"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover border border-gray-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-sm text-gray-500">
                Preview of your profile image
              </span>
            </div>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating Profile...' : 'Update Profile'}
          </button>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="border-t border-gray-200 pt-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-red-800 mb-2">Danger Zone</h3>
          <p className="text-sm text-red-600 mb-3">
            These actions are permanent and cannot be undone.
          </p>
          <button
            type="button"
            onClick={() => {
              if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                // TODO: Implement account deletion
                alert('Account deletion is not yet implemented.');
              }
            }}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}