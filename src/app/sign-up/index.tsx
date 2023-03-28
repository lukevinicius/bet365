'use client'

import { useState } from 'react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  useToast,
  Text,
} from '@chakra-ui/react'
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri'
import { useCompany } from '@/hooks/useCompany'
import { useAuth } from '@/hooks/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Form/Input'
import { api } from '@/services/api/axios'
import { redirect } from 'react-router-dom'

interface CreateUserFormProps {
  companyId: string
  username: string
  name: string
  document: string
  password: string
  password_confirmation: string
  email: string
  phone: string
  birthDate: string
  affiliate: string
}

const createUserFormSchema = z.object({
  username: z
    .string()
    .min(6, 'Mínimo de 6 caracteres')
    .max(15, 'Maximo de 15 caracteres'),
  name: z.string(),
  document: z.string().min(11, 'CPF inválido').max(14, 'CPF inválido'),
  birthDate: z.string(),
  email: z.string().email('O campo precisa ser um email válido'),
  phone: z.string(),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
})

export function SignUp() {
  const { company } = useCompany()
  const { signIn } = useAuth()
  const toast = useToast()
  const [show, setShow] = useState(false)
  const [load, setLoad] = useState(false)
  const [ageChecked, setAgeChecked] = useState(false)

  const { register, handleSubmit, formState, getValues, setValue } =
    useForm<CreateUserFormProps>({
      resolver: zodResolver(createUserFormSchema),
    })

  const handleCreateUser: SubmitHandler<CreateUserFormProps> = async (data) => {
    if (ageChecked) {
      await api
        .post('/users', {
          ...data,
          companyId: company.id,
          collaborator: data.affiliate,
          manager: data.affiliate,
        })
        .then(() => {
          signIn({
            username: data.username,
            password: data.password,
          }).finally(() => {
            redirect('/')
          })
        })
        .catch((err) => {
          toast({
            title: 'Erro ao criar usuário.',
            description: `${err}`,
            status: 'error',
            position: 'top',
            duration: 5000,
            isClosable: true,
          })
        })
    } else {
      toast({
        title: 'Proibido para menores de 18 anos.',
        description: `Só é permitido criar conta neste site pessoas com idade maior que 18 anos.`,
        status: 'warning',
        position: 'top',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  async function handleFindPersonInfo() {
    setLoad(true)
    const cpf = getValues('document')
    if (cpf.length > 10) {
      const formatCpf = cpf.replace(/[^0-9]/g, '')
      await api
        .get(`/person-by-cpf`, { params: { cpf: formatCpf } })
        .then((response) => {
          if (response.data.ageChecked) {
            setValue('name', response.data.name)
            setValue('birthDate', response.data.birthDate)
            setAgeChecked(response.data.ageChecked)
            setLoad(false)
          } else {
            toast({
              title: 'Proibido para menores de 18 anos.',
              description: `Só é permitido criar conta neste site pessoas com idade maior que 18 anos.`,
              status: 'warning',
              position: 'top',
              duration: 5000,
              isClosable: true,
            })
            redirect('/')
          }
        })
        .catch((err) => {
          toast({
            title: 'Erro ao consultar CPF.',
            description: `Occorreu um erro ao buscar informações do CPF. Nossa equipe já está trabalhando no caso. ${err.message}`,
            status: 'error',
            position: 'top',
            duration: 5000,
            isClosable: true,
          })
          setLoad(false)
        })
    } else {
      toast({
        title: 'Erro ao consultar CPF.',
        description: `O CPF digitado não é valido`,
        status: 'warning',
        position: 'top',
        duration: 5000,
        isClosable: true,
      })
      setLoad(false)
    }
  }

  const handleClick = () => setShow(!show)

  return (
    <Flex w="100%" justify="center" mb="10" pt="60px">
      <Flex
        as="form"
        w="100%"
        maxW={530}
        bg="gray.900"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleCreateUser)}
      >
        <Text fontWeight="bold" fontSize="1.5rem" mb="5">
          Abrir Conta
        </Text>
        <Stack spacing="4">
          <Text fontWeight="bold">Informação pessoal</Text>
          <Text fontSize="0.8rem">
            Por favor introduza informação correta. A verificação da sua
            identidade é necessária para permitir a utilização contínua da sua
            conta.
          </Text>
          <Flex>
            <Input
              placeholder="000.000.000-00"
              error={formState.errors.document}
              {...register('document')}
            />
            <Button
              size="lg"
              isLoading={load}
              colorScheme="orange"
              ml="2"
              onClick={() => handleFindPersonInfo()}
            >
              VERIFICAR
            </Button>
          </Flex>
          <Input
            placeholder="Nome Completo"
            type="text"
            isDisabled
            error={formState.errors.name}
            {...register('name')}
          />
          <Input
            placeholder="Data de Nascimento"
            isDisabled
            error={formState.errors.birthDate}
            {...register('birthDate')}
          />
        </Stack>
        <Divider my="4" size="1" colorScheme="gray.800" />
        <Stack spacing="4">
          <Text fontWeight="bold">Informação para Contato</Text>
          <Input
            placeholder="example@mail.com"
            label="E-mail"
            type="email"
            error={formState.errors.email}
            {...register('email')}
          />
          <Text>Número de telefone</Text>
          <InputGroup>
            <Input
              type="tel"
              placeholder="+55 55 55555-5555"
              error={formState.errors.phone}
              {...register('phone')}
            />
          </InputGroup>
        </Stack>
        <Divider my="4" size="1" colorScheme="gray.800" />
        <Stack spacing="4">
          <Text fontWeight="bold">Criar Login</Text>
          <Input
            placeholder="Usuário"
            type="text"
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
              <Button size="sm" onClick={handleClick} colorScheme="orange">
                {show ? <RiEyeLine /> : <RiEyeCloseLine />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Stack>
        <Divider my="4" size="1" colorScheme="gray.800" />
        <Stack spacing="4">
          <Text fontWeight="bold">Codigo de Afiliado</Text>
          <Input
            placeholder="Código de Bônus"
            type="text"
            error={formState.errors.affiliate}
            {...register('affiliate')}
          />
          <Checkbox textAlign="justify" fontSize="0.8rem" required>
            Queira por favor assinalar para confirmar que leu e compreende as
            políticas do {company.name} relativamente a verificação de idade,
            termos, condições, regras e política de privacidade.
          </Checkbox>
        </Stack>
        <Button
          type="submit"
          className="mt-6 py-6"
          mt="6"
          py="6"
          colorScheme="blue"
          isLoading={formState.isSubmitting}
        >
          Junte-se à {company.name}
        </Button>
        <Link
          _hover={{
            textDecoration: 'none',
            color: 'gray.500',
          }}
          textAlign="center"
          href="/"
          py="4"
        >
          Voltar
        </Link>
      </Flex>
    </Flex>
  )
}
