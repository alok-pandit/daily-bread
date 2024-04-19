import * as Form from '@radix-ui/react-form'
import { useFormContext } from 'react-hook-form'

import { TextInput } from '../login-form/styles'

import { textGradient } from '@/app/styles'
import { clmx } from '@/utils'

const FullnameFormField = () => {
  const { register } = useFormContext()
  return (
    <Form.Field className="grid mb-[10px]" name="fullname">
      <div className="flex items-baseline justify-between">
        <Form.Label
          className={clmx(
            'text-[15px] font-medium leading-[35px]',
            // `${textGradient}`
            'text-white'
          )}
        >
          Full Name:
        </Form.Label>

        <Form.Message
          className={clmx(
            'text-[15px] font-medium leading-[35px]',
            `${textGradient}`
          )}
          match="valueMissing"
        >
          Name is mandatory
        </Form.Message>
      </div>

      <Form.Control asChild>
        <TextInput type="text" required {...register('fullname')} />
      </Form.Control>
    </Form.Field>
  )
}

export default FullnameFormField
