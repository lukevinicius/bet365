import { Select } from '@/components/Form/Select'
import { Button } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

interface DepositsByPlayerProps {
  period: string
}

const depositsByPlayerSchema = z.object({
  period: z.string(),
})

export function DepositsByPlayer() {
  const { register, handleSubmit, formState } = useForm<DepositsByPlayerProps>({
    resolver: zodResolver(depositsByPlayerSchema),
  })

  const handleSearch: SubmitHandler<DepositsByPlayerProps> = async (values) => {
    console.log(values)
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className="flex justify-between space-x-3"
    >
      <Select {...register('period')}>
        <option value="last-24-hours">Last 24 hours</option>
        <option value="yesterday">Yesterday</option>
        <option value="last-7-days">Last 7 days</option>
        <option value="last-15-days">Last Week</option>
        <option value="last-30-days">Last 30 days</option>
      </Select>
      <Button colorScheme="blue" size="lg" isLoading={formState.isSubmitting}>
        Buscar
      </Button>
      <Button colorScheme="green" size="lg">
        Depositar
      </Button>
    </form>
  )
}
