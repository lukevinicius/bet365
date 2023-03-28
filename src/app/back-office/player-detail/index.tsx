import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/Form/Input'
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react'
import { api } from '@/services/api/axios'
import { useState } from 'react'
import { useCompany } from '@/hooks/useCompany'
import { redirect } from 'react-router-dom'
import { DepositsByPlayer } from './deposits'
import { WithdrawlsByPlayer } from './withdrawls'

interface PlayerProfileFormProps {
  document: string
}

const playerProfileFormSchema = z.object({
  document: z
    .string()
    .min(9, 'Documento muito curto')
    .max(14, 'Documento muito longo'),
})

interface ResponseApi {
  user: {
    id: string
    name: string
    email: string
    document: string
    username: string
    phone: string
    birthDate: string
    createdAt: string
    updatedAt: string
  }
  wallet: {
    balance: number
    courtesy: number
    totalDeposit: number
    totalWithdrawal: number
  }
}

export function PlayerDetail() {
  const toast = useToast()
  const { company } = useCompany()
  const [data, setData] = useState<ResponseApi>({} as ResponseApi)

  const { register, handleSubmit, formState } = useForm<PlayerProfileFormProps>(
    {
      resolver: zodResolver(playerProfileFormSchema),
    },
  )

  const handlePlayerProfile: SubmitHandler<PlayerProfileFormProps> = async (
    body,
  ) => {
    if (data.user) {
      setData({} as ResponseApi)
      return
    }
    const session = sessionStorage.getItem(`@${company.name}:user`)

    if (!session) {
      toast({
        title: 'Erro ao buscar dados do jogador',
        description: 'Usuário não autenticado',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      redirect('/')

      return
    }

    const token = JSON.parse(session).token

    await api
      .get('/user/profile-by-document', {
        params: {
          companyId: company.id,
          document: body.document,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        toast({
          title: 'Erro ao buscar dados do jogador',
          description: err.response.data.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  return (
    <Box className="w-full py-6 mx-auto px-6">
      <Box
        flex="1"
        borderRadius={8}
        bg="gray.800"
        className="space-y-5 p-8 flex-1"
      >
        <form
          className="flex items-center space-x-5"
          onSubmit={handleSubmit(handlePlayerProfile)}
        >
          <Input
            placeholder="Nome de usuário"
            {...register('document')}
            error={formState.errors.document}
          />
          <Button
            colorScheme="blue"
            size="lg"
            type="submit"
            isLoading={formState.isSubmitting}
          >
            Buscar
          </Button>
        </form>
        {data.user && (
          <div className="space-y-5">
            <div className="flex justify-between">
              <div>
                <div className="flex justify-between">
                  <h1 className="mr-5">Nome:</h1>
                  <h1 className="mr-5">{data.user.name}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="mr-5">Documento:</h1>
                  <h1 className="mr-5">{data.user.document}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="mr-5">E-Mail:</h1>
                  <h1 className="mr-5">{data.user.email}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="mr-5">Telefone:</h1>
                  <h1 className="mr-5">{data.user.phone}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="mr-5">Usuário:</h1>
                  <h1 className="mr-5">{data.user.username}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="mr-5">Data de Nascimento:</h1>
                  <h1 className="mr-5">{data.user.birthDate}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="mr-5">Criação da conta:</h1>
                  <h1 className="mr-5">{data.user.createdAt}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="mr-5">Atualização da conta:</h1>
                  <h1 className="mr-5">{data.user.updatedAt}</h1>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <h1 className="mr-5">Carteira:</h1>
                  <h1 className="mr-5">
                    {data.wallet.balance.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="mr-5">Bônus:</h1>
                  <h1 className="mr-5">
                    {data.wallet.courtesy.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="mr-5">Valor depositado:</h1>
                  <h1 className="mr-5">
                    {data.wallet.totalDeposit.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="mr-5">Valor sacado:</h1>
                  <h1 className="mr-5">
                    {data.wallet.totalWithdrawal.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </h1>
                </div>
              </div>
              {/* <div>
              <h1>Apostas nos esportes: {data.wallet.balance}</h1>
              <h1>Prêmios nos esportes: {data.wallet.totalDeposit}</h1>
              <h1>Apostas no cassino: {data.wallet.courtesy}</h1>
              <h1>Prêmios no cassino: {data.wallet.totalWithdrawal}</h1>
            </div> */}
            </div>
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Depósitos</Tab>
                <Tab>Saques</Tab>
                <Tab>Apostas no Sportbook</Tab>
                <Tab>Apostas no Cassino</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <DepositsByPlayer />
                </TabPanel>
                <TabPanel>
                  <WithdrawlsByPlayer />
                </TabPanel>
                <TabPanel>
                  <h1>Lista de apostas no esporte</h1>
                </TabPanel>
                <TabPanel>
                  <h1>Lista de apostas no cassino</h1>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        )}
      </Box>
    </Box>
  )
}
