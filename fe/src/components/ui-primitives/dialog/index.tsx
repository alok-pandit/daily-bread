import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import Button from '../button'

import {
  CloseBtn,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  Div,
  Hamburger
} from './styles'

export interface IDialogProps {
  dialogTriggerText: string
  dialogTitleText: string
  dialogDescriptionText?: string
  submitBtnText?: string
  submitBtnFn?: () => void
  children?: React.ReactNode
  hideTrigger?: boolean
  isDrawer?: boolean
}

const PopupDialog = (props: IDialogProps) => (
  <Dialog.Root defaultOpen={props.hideTrigger}>
    {!props.hideTrigger && (
      <Dialog.Trigger asChild>
        {props.isDrawer ? (
          <Hamburger />
        ) : (
          <Button title={props.dialogTriggerText} />
        )}
      </Dialog.Trigger>
    )}
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent drawer={props.isDrawer ? 1 : 0}>
        <DialogTitle>{props.dialogTitleText}</DialogTitle>
        <DialogDescription>{props.dialogDescriptionText}</DialogDescription>
        {props.children}
        <Div>
          <Dialog.Close asChild>
            {props.submitBtnFn && (
              <span aria-label="Submit button span">
                <Button
                  onClick={props.submitBtnFn}
                  title={props.submitBtnText ?? 'Submit'}
                />
              </span>
            )}
          </Dialog.Close>
        </Div>
        <Dialog.Close asChild>
          <CloseBtn aria-label="Close">
            <Cross2Icon />
          </CloseBtn>
        </Dialog.Close>
      </DialogContent>
    </Dialog.Portal>
  </Dialog.Root>
)

export default PopupDialog
