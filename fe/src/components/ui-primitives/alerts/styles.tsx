import * as AlertDialog from '@radix-ui/react-alert-dialog'
import type {
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogOverlayProps,
  AlertDialogTitleProps
} from '@radix-ui/react-alert-dialog'
import { forwardRef } from 'react'
import { w } from 'windstitch'

import { clmx } from '@/utils'

const AlertActionBtnCls = clmx(
  `text-white bg-primary-500 shadow-yellow-100 shadow-md`,
  `inline-flex h-[35px] items-center justify-center`,
  `rounded-[4px] px-[15px] font-medium leading-none`,
  `outline-none focus:shadow-yellow-700 ring-0`
)

const AlertDialogContentCls = clmx(
  `data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]`,
  `max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%]`,
  `rounded-[6px] bg-yellow-100 p-[25px] shadow-yellow-300 shadow-md`,
  `focus:outline-none z-40`
)

const AlertDialogTriggerCls = clmx(
  `text-violet hover:bg-yellow-100 shadow-black inline-flex`,
  `h-[35px] items-center justify-center rounded-[4px] bg-yellow-100`,
  `px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none`,
  `focus:shadow-[0_0_0_2px] focus:shadow-black`
)

const AlertDialogOverlayCls = clmx(
  `backdrop-blur-md data-[state=open]:animate-overlayShow fixed inset-0 z-30`
)

const AlertDialogTitleCls = clmx(`text-black m-0 text-[17px] font-medium`)

const AlertActionDivCls = clmx(`flex justify-end gap-[25px]`)

const AlertDialogDescriptionCls = clmx(
  `text-black mt-4 mb-5 text-[15px] leading-normal`
)

export const AlertActionBtn = w.button(AlertActionBtnCls)

const c1 = (props: AlertDialogContentProps) => (
  <AlertDialog.Content {...props} />
)

const c2 = w(c1, { className: AlertDialogContentCls })

export const AlertDialogContent = forwardRef(c2)

export const AlertDialogTriggerBtn = w.button(AlertDialogTriggerCls)

export const AlertActionContainerDiv = w.div(AlertActionDivCls)

const o1 = (props: AlertDialogOverlayProps) => (
  <AlertDialog.Overlay {...props} />
)

const o2 = w(o1, { className: AlertDialogOverlayCls })

export const AlertDialogOverlay = forwardRef(o2)

const ttl1 = (props: AlertDialogTitleProps) => <AlertDialog.Title {...props} />

const ttl2 = w(ttl1, { className: AlertDialogTitleCls })

export const AlertDialogTitle = forwardRef(ttl2)

const d1 = (props: AlertDialogDescriptionProps) => (
  <AlertDialog.Description {...props} />
)

const d2 = w(d1, { className: AlertDialogDescriptionCls })

export const AlertDialogDescription = forwardRef(d2)
