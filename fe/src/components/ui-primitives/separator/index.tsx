import * as Sep from '@radix-ui/react-separator'

const Separator = () => {
  return (
    <Sep.Root className="bg-white dark:bg-slate-700 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
  )
}

export default Separator
