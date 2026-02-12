export default function Loading() {
    return (
      <div className="min-h-screen p-10 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
          <div className="w-1/2 h-8 bg-gray-300 rounded" />
          <div className="w-3/4 h-4 bg-gray-300 rounded" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-6 bg-gray-300 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }