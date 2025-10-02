'use client';

interface RemoveMemberButtonProps {
  userName: string | null;
  userEmail: string | null;
}

export function RemoveMemberButton({ userName, userEmail }: RemoveMemberButtonProps) {
  const handleRemove = () => {
    if (confirm(`Are you sure you want to remove ${userName || userEmail} from the organization?`)) {
      alert('Member removal functionality is not yet implemented.');
    }
  };

  return (
    <button
      type="button"
      className="text-sm text-red-600 hover:text-red-800 focus:outline-none"
      onClick={handleRemove}
    >
      Remove
    </button>
  );
}