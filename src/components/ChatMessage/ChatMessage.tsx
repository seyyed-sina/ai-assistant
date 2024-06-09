import { Avatar } from '@nextui-org/react'
import clsx from 'clsx'
import React from 'react'
import { useAnimatedText } from '../AnimatedText'

export type ChatMessageProps = Omit<React.HTMLProps<HTMLDivElement>, 'role'> & {
  message: string
  role: 'user' | 'assistant'
  disableAnimation?: boolean
  onEdit?: (newPrompt: string) => void
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  role,
  disableAnimation = false,
  onEdit,
  ...props
}) => {
  const [contentEditable, setContentEditable] = React.useState(false)
  const content = useAnimatedText(message, {
    maxTime: 1000,
    disabled: role === 'user' || disableAnimation,
  })
  const [newContent, setNewContent] = React.useState(content)

  const handleEditMessage = () => {
    setContentEditable(true)
  }

  const handleSaveMessage = () => {
    setContentEditable(false)
    onEdit?.(newContent)
  }

  return (
    <div {...props} className={clsx('', props.className)}>
      <div className="flex flex-row gap-4 items-start">
        <Avatar
          className="flex-shrink-0"
          showFallback
          color={role === 'assistant' ? 'primary' : 'default'}
          name={role === 'assistant' ? 'A' : ''}
          classNames={{
            name: 'text-[16px]',
          }}
        />
        <div className="flex-grow border border-gray-200 rounded-lg p-4 text-md bg-white shadow-sm mt-[-4px]">
          {!contentEditable && (
            <div
              className="whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
          {role === 'user' && !contentEditable && (
            <button className="rounded-md p-1" onClick={handleEditMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="icon-md-heavy"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M13.293 4.293a4.536 4.536 0 1 1 6.414 6.414l-1 1-7.094 7.094A5 5 0 0 1 8.9 20.197l-4.736.79a1 1 0 0 1-1.15-1.151l.789-4.736a5 5 0 0 1 1.396-2.713zM13 7.414l-6.386 6.387a3 3 0 0 0-.838 1.628l-.56 3.355 3.355-.56a3 3 0 0 0 1.628-.837L16.586 11zm5 2.172L14.414 6l.293-.293a2.536 2.536 0 0 1 3.586 3.586z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          )}
          {contentEditable && (
            <textarea
              className="m-0 resize-none border-0 bg-transparent p-0 focus:ring-0 focus:outline-0 focus-visible:ring-0 size-full"
              spellCheck="false"
              defaultValue={content}
              onChange={(e) => setNewContent(e.target.value)}
            />
          )}
          {contentEditable && (
            <div className="mt-2 flex justify-center text-center gap-2">
              <button
                className="px-3 py-2 rounded-md text-white flex items-center text-center bg-green-500"
                onClick={handleSaveMessage}
              >
                Save &amp; Submit
              </button>
              <button
                className="px-3 border border-gray-300 py-2 rounded-md flex items-center text-center"
                onClick={() => setContentEditable(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
