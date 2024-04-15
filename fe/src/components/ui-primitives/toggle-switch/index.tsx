import * as Switch from '@radix-ui/react-switch'

import { FunkyBackground } from '@/app/styles'
import { clmx } from '@/utils'

const ToggleSwitch = (props: {
  onChange: (c: boolean) => void
  checked: boolean
  label: string | React.ReactElement
}) => (
  <div className="flex items-center">
    <FunkyBackground>
      <span
        onClick={() => props.onChange(!props.checked)}
        className={clmx(`dark:text-black text-white cursor-pointer z-20`)}
      >
        {props.label}
      </span>
    </FunkyBackground>
    <Switch.Root
      checked={props.checked}
      onCheckedChange={(c) => props.onChange(c)}
      aria-label={'ToggleSwitch'}
      name="checkbox"
      className={clmx(
        'w-[38px] h-[21px] bg-transparent rounded-full',
        'relative shadow-[0_2px_10px] shadow-black',
        'data-[state=checked]:bg-black',
        'outline-none cursor-pointer ml-2'
      )}
      id="dark-mode"
    >
      <Switch.Thumb
        id="dark-mode-thumb"
        className="block w-[17px] h-[17px] bg-white dark:bg-slate-700 rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]"
      />
    </Switch.Root>
  </div>
)

export default ToggleSwitch
