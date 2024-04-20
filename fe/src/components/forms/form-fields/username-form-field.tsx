import * as Form from '@radix-ui/react-form'
import { useFormContext } from 'react-hook-form'

import { TextInput } from '../login-form/styles'

import { textGradient } from '@/app/styles'
import { clmx } from '@/utils'

const UsernameFormField = () => {
  const { register } = useFormContext()
  return (
    <Form.Field className="grid mb-[10px]" name="username">
      <div className="flex items-baseline justify-between">
        <Form.Label
          className={clmx(
            'text-[15px] font-medium leading-[35px]',
            // `${textGradient}`
            'text-white dark:text-primary-100'
          )}
        >
          Username:
        </Form.Label>

        <Form.Message
          className={clmx(
            'text-[15px] font-medium leading-[35px]',
            `${textGradient}`
          )}
          match="valueMissing"
        >
          Username is mandatory
        </Form.Message>
      </div>

      <Form.Control asChild>
        <TextInput
          autoComplete="none"
          type="text"
          required
          {...register('username')}
        />
      </Form.Control>
    </Form.Field>
  )
}

export default UsernameFormField
