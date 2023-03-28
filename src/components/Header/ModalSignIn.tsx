import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Box,
  Button,
  Flex,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri'
import { Input } from '@/components/Form/Input'
import { useAuth } from '@/hooks/useAuth'

interface ModalSignInProps {
  isOpen: boolean
  onClose: () => void
}

type SignInFormProps = {
  username: string
  password: string
}

const signInFormSchema = z.object({
  username: z.string().min(1),
  password: z
    .string()
    .min(5, { message: 'Senha deve ter no mínimo 5 caracteres' })
    .max(20, { message: 'Senha deve ter no máximo 20 caracteres' }),
})

export function ModalSignIn({ isOpen, onClose }: ModalSignInProps) {
  const { register, handleSubmit, formState } = useForm<SignInFormProps>({
    resolver: zodResolver(signInFormSchema),
  })
  const { signIn } = useAuth()
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignIn: SubmitHandler<SignInFormProps> = async (
    data: SignInFormProps,
  ) => {
    await signIn(data)
      .then(() => {
        onClose()
      })
      .catch(() => {
        setErrorMessage('Usuário ou senha inválidos')
      })
  }

  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg="gray.900" mx="4">
        <ModalBody py={6}>
          <Flex
            as="form"
            flexDir="column"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <Stack spacing="3">
              <Input
                placeholder="Usuário"
                error={formState.errors.username}
                {...register('username')}
              />

              <InputGroup alignItems="center" justifyContent="center">
                <Input
                  pr="4rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Senha"
                  error={formState.errors.password}
                  {...register('password')}
                />
                <InputRightElement mt="1" width="4rem">
                  <Button size="sm" onClick={handleClick} colorScheme="green">
                    {show ? <RiEyeLine /> : <RiEyeCloseLine />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button
                colorScheme="green"
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Entrar
              </Button>
              {errorMessage && (
                <Text color="red.500" fontSize="0.9rem" textAlign="center">
                  {errorMessage}
                </Text>
              )}
              <Box textAlign="center">
                <Link onClick={onClose} href="/forgot-password">
                  Esqueci a senha
                </Link>
              </Box>
            </Stack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
