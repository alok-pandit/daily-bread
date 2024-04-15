import { clmx } from '@/utils'

const Spinner = ({ full = true }) => {
  return (
    <div
      className={clmx(
        `flex justify-center items-center overflow-hidden`,
        `${full ? 'h-screen' : 'h-56 '}`
      )}
    >
      <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
      </div>
    </div>
  )
}

export default Spinner
