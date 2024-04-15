import { LegacyRef, forwardRef } from 'react'

import { Button1, Div1, Div2, Span1 } from './styles'

interface IButtonProps {
  title: string
  onClick?: () => void
  type?: 'button' | 'reset' | 'submit' | undefined
  disabled?: boolean
  className?: string
}

const Button = (
  props: IButtonProps,
  ref?: LegacyRef<HTMLDivElement> | undefined
) => {
  return (
    <Div1 ref={ref}>
      <Div2 />
      <Button1
        type={props.type ?? 'button'}
        disabled={props.disabled}
        aria-label={props.title}
        onClick={() => (props.onClick ? props.onClick() : null)}
        {...props}
      >
        <Span1 />
        {props.title}
      </Button1>
    </Div1>
  )
}

export default forwardRef(Button)
