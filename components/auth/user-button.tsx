'use client';

import { UserButton } from '@keyloom/ui/auth'

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export function UserButtonComponent({ user }: { user: User }) {
  return (
    <UserButton 
      user={user}
      signOutEndpoint="/api/auth/logout" // CLI-generated endpoint
      onSignOut={() => {
        // Optional: Custom logout logic
        window.location.href = '/sign-in'
      }}
    />
  )
}