import { useAtom, useAtomValue } from 'jotai'
import { RefObject } from 'react'
import scrollIntoViewIfNeeded from 'smooth-scroll-into-view-if-needed'

import { chatRoomAtom, msgAtom, userNameAtom } from '@/atoms'
import { useChatMutation } from '@/codegen/gen/hooks/mutations.hooks'
import { clmx } from '@/utils'

export const smoothScroll = (targetY: number, duration: number) => {
  const startingY = window.scrollY
  const diff = targetY - startingY
  let start: number

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    const time = timestamp - start
    const percent = Math.min(time / duration, 1)

    window.scrollTo(0, startingY + diff * percent)

    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

const ChatMsgBtn = ({
  sendBtnRef
}: {
  sendBtnRef: RefObject<HTMLDivElement>
}) => {
  const roomId = useAtomValue(chatRoomAtom)
  const [message, setMsg] = useAtom(msgAtom)
  const [_, sendMsg] = useChatMutation()
  const from = useAtomValue(userNameAtom)

  return (
    <button
      className={clmx(
        'bg-blue-600 dark:bg-slate-600',
        'text-white font-bold rounded',
        'border-b-4 border-blue-800',
        'dark:border-slate-800 py-2 px-4 m-2 mb-0 transition-all'
      )}
      disabled={!message}
      onClick={(e) => {
        e.preventDefault()
        sendMsg({
          message,
          roomId,
          from,
          to: String(roomId),
          timestamp: String(Date.now())
        }).then(() => {
          setMsg('')
          if (sendBtnRef?.current) {
            scrollIntoViewIfNeeded(sendBtnRef.current, {
              block: 'end',
              inline: 'nearest',
              behavior: 'smooth'
            })
          }
        })
      }}
    >
      Send
    </button>
  )
}

export default ChatMsgBtn
