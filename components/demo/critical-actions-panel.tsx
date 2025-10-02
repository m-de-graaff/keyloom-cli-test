'use client';

export function CriticalActionsPanel() {
  return (
    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
      <h4 className="font-medium text-red-900 mb-3">Critical Actions</h4>
      <div className="space-y-3">
        <button
          type="button"
          className="w-full text-left px-3 py-2 text-sm bg-white border border-red-300 rounded text-red-700 hover:bg-red-50"
          onClick={() => alert('Demo: Transfer ownership functionality')}
        >
          Transfer Ownership
        </button>
        <button
          type="button"
          className="w-full text-left px-3 py-2 text-sm bg-white border border-red-300 rounded text-red-700 hover:bg-red-50"
          onClick={() => alert('Demo: Organization deletion functionality')}
        >
          Delete Organization
        </button>
        <button
          type="button"
          className="w-full text-left px-3 py-2 text-sm bg-white border border-red-300 rounded text-red-700 hover:bg-red-50"
          onClick={() => alert('Demo: Data export functionality')}
        >
          Export All Data
        </button>
      </div>
    </div>
  );
}