import Spinner from '@/components/spinner'

export default function Loading() {
  return (
    <div className="backdrop-blur-sm min-h-screen min-w-screen z-50">
      <Spinner full={false} />
    </div>
  )
}
