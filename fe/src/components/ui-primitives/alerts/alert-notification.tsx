import * as AlertDialog from '@radix-ui/react-alert-dialog'

import Separator from '../separator'

import {
  AlertActionBtn,
  AlertActionContainerDiv,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTriggerBtn
} from './styles'

interface IAlertNotificationProps {
  hideTrigger?: boolean
  alertTitle: string
  alertDescription: string
  triggerText?: string
  alertActiontext: string
  actionFn?: ({ show, message }: { show: boolean; message: string }) => void
}

const AlertNotification = (props: IAlertNotificationProps) => (
  <AlertDialog.Root defaultOpen={props.hideTrigger}>
    {!props.hideTrigger && (
      <AlertDialog.Trigger asChild>
        <AlertDialogTriggerBtn>{props.triggerText}</AlertDialogTriggerBtn>
      </AlertDialog.Trigger>
    )}
    <AlertDialog.Portal>
      <AlertDialogOverlay />
      <AlertDialogContent
        onCloseAutoFocus={() =>
          props.actionFn ? props.actionFn({ show: false, message: '' }) : null
        }
      >
        <AlertDialogTitle>{props.alertTitle}</AlertDialogTitle>
        <Separator />
        <AlertDialogDescription>
          {props.alertDescription}
        </AlertDialogDescription>
        <AlertActionContainerDiv>
          <AlertDialog.Action asChild>
            <AlertActionBtn
              onClick={() =>
                props.actionFn
                  ? props.actionFn({ show: false, message: '' })
                  : null
              }
            >
              {props.alertActiontext ?? 'Ok'}
            </AlertActionBtn>
          </AlertDialog.Action>
        </AlertActionContainerDiv>
      </AlertDialogContent>
    </AlertDialog.Portal>
  </AlertDialog.Root>
)

export default AlertNotification
