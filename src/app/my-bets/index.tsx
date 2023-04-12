import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
} from '@chakra-ui/react'
import { ListBets } from './ListBets'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { api } from '@/services/api/axios'
import { IBet } from '@/interface/Bet'

export function MyBets() {
  const { user, findBalance } = useAuth()
  const [bets, setBets] = useState<IBet[]>([])

  async function findBets() {
    await api
      .get('/tickets-by-user', {
        params: {
          userId: user.id,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        if (
          response.data.filter((bet: any) => bet.status === 'won').length > 0
        ) {
          findBalance()
        }
        setBets(response.data)
      })
  }

  useEffect(() => {
    findBets()
  }, [])

  return (
    <>
      {bets.length > 0 ? (
        <Tabs>
          <TabList className="bg-[#444444]">
            <Tab>Pendentes</Tab>
            <Tab>Resolvidas</Tab>
          </TabList>

          <TabPanels className="bg-[#505050]">
            <TabPanel p="0">
              <ListBets bets={bets.filter((bet) => bet.status === 'pending')} />
            </TabPanel>
            <TabPanel p="0">
              <ListBets bets={bets.filter((bet) => bet.status !== 'pending')} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <div className="text-center">
          <Spinner size="lg" />
        </div>
      )}
    </>
  )
}
