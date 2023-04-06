import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { ListBets } from './ListBets'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { api } from '@/services/api/axios'
import { IBet } from '@/interface/Bet'

export function MyBets() {
  const { user } = useAuth()
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
        console.log(response.data)
        setBets(response.data)
      })
  }

  useEffect(() => {
    findBets()
  }, [])

  return (
    <Tabs>
      <TabList className="bg-[#444444]">
        <Tab>Pendentes</Tab>
        <Tab>Resolvidas</Tab>
      </TabList>

      <TabPanels className="bg-[#505050]">
        <TabPanel p="0">
          <ListBets bets={bets} />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
