export function ProjectSkeleton() {
  return (
    <div className="flex-none w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-600"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-3/4"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-16"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-20"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-14"></div>
        </div>
        <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  )
}

export function ExperienceSkeleton() {
  return (
    <div className="relative mb-12">
      <div className="flex items-center mb-4">
        <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
        <div className="ml-12 md:ml-0 md:mr-auto md:pr-8 md:w-1/2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm animate-pulse">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-3 w-1/2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
