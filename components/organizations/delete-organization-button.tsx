'use client';

interface DeleteOrganizationButtonProps {
  organizationName: string;
}

export function DeleteOrganizationButton({ organizationName }: DeleteOrganizationButtonProps) {
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${organizationName}? This action cannot be undone and will remove all members and data.`)) {
      alert('Organization deletion functionality is not yet implemented.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="text-sm font-medium text-red-600 hover:text-red-800 focus:outline-none"
    >
      Delete Organization
    </button>
  );
}