import { Input } from '@/components/Form/Input'
import { api } from '@/services/api/axios'
import { Button, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

interface ForgotPasswordFormProps {
  username: string
}

const forgotPasswordFormSchema = z.object({
  username: z.string(),
})

interface ResetPasswordFormProps {
  password: string
  passwordConfirmation: string
}

const resetPasswordFormSchema = z
  .object({
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Senhas não conferem',
    path: ['passwordConfirmation'],
  })

export function ForgotPassword() {
  const path = window.location.pathname.split('/').pop()

  const { register, handleSubmit, formState } =
    useForm<ForgotPasswordFormProps>({
      resolver: zodResolver(forgotPasswordFormSchema),
    })

  const handleForgotPassword: SubmitHandler<ForgotPasswordFormProps> = async (
    data,
  ) => {
    api.post('/auth/forgot-password', data)
  }

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: formStateReset,
  } = useForm<ResetPasswordFormProps>({
    resolver: zodResolver(resetPasswordFormSchema),
  })

  const handleResetPassword: SubmitHandler<ResetPasswordFormProps> = async (
    data,
  ) => {
    api.put('/auth/reset-password', {
      newPassword: data.password,
      token: path,
    })
  }

  return (
    <div className="flex w-full py-6 mx-auto px-6 justify-center ">
      <Stack
        spacing={5}
        flex="1"
        borderRadius={8}
        maxW={580}
        bg="gray.800"
        p="8"
      >
        {path === 'forgot-password' ? (
          <form
            className="space-y-5"
            onSubmit={handleSubmit(handleForgotPassword)}
          >
            <h1 className="text-2xl font-bold">Esqueci a Senha</h1>
            <p>
              Por favor, insira o seu nome de usuário para nos ajudar a
              indentificar a sua conta
            </p>
            <Input
              placeholder="Usuário"
              type="text"
              error={formState.errors.username}
              {...register('username')}
            />
            <div className="text-center">
              <Button
                colorScheme="green"
                textAlign="center"
                w="full"
                size="lg"
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Enviar código de ativação
              </Button>
            </div>
          </form>
        ) : (
          <form
            className="space-y-5"
            onSubmit={handleSubmitReset(handleResetPassword)}
          >
            <h1 className="text-2xl font-bold">Redefinir Senha</h1>
            <Input
              placeholder="Nova Senha"
              type="text"
              error={formStateReset.errors.password}
              {...registerReset('password')}
            />
            <Input
              placeholder="Usuário"
              type="text"
              error={formStateReset.errors.passwordConfirmation}
              {...registerReset('passwordConfirmation')}
            />
            <Button
              colorScheme="green"
              size="lg"
              type="submit"
              isLoading={formStateReset.isSubmitting}
            />
          </form>
        )}
      </Stack>
    </div>
  )
}
