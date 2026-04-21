import { Skeleton } from "@/components/ui/skeleton"

export function HeroSkeleton() {
  return (
    <div className="relative min-h-[600px] w-full bg-black/5 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-16 w-3/4 max-w-2xl" />
          <Skeleton className="h-24 w-1/2 max-w-xl" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SectionSkeleton() {
  return (
    <div className="w-full py-20 odd:bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-12 w-1/2 max-w-lg" />
          <Skeleton className="h-20 w-3/4 max-w-2xl" />
          <div className="grid w-full grid-cols-1 gap-8 pt-10 md:grid-cols-3">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ListSkeleton() {
  return (
    <div className="w-full py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 flex-1" />
                </div>
              ))}
            </div>
          </div>
          <Skeleton className="h-[400px] rounded-3xl" />
        </div>
      </div>
    </div>
  )
}

export function GridSkeleton() {
  return (
    <div className="w-full py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <Skeleton className="mx-auto h-6 w-24 rounded-full" />
        <Skeleton className="mx-auto mt-6 h-12 w-1/2" />
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-60 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="w-full py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4 rounded-2xl border p-6">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
