import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'
import {
  Select as FormSelect,
  FormLabel,
  FormControl,
  SelectProps as ChakraSelectProps,
  FormErrorMessage,
} from '@chakra-ui/react'

interface SelectProps extends ChakraSelectProps {
  name: string
  label?: string
  options?: {
    id: string
    name: string
  }[]
  error?: FieldError
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, label, options, error = null, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <FormSelect name={name} id={name} size="lg" ref={ref} {...rest}>
        {!!options &&
          options.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
      </FormSelect>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Select = forwardRef(SelectBase)
