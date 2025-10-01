import { UserButton } from '@keyloom/ui/auth'

export function UserButtonComponent({ user }: { user: any }) {
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