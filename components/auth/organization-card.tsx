export function OrganizationCard({ organization }: { organization: any }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 bg-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-medium text-lg">
                {organization.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">
              {organization.name}
            </h3>
            <p className="text-sm text-gray-500">
              Role: <span className="capitalize">{organization.role}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}