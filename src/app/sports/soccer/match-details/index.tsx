import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useState } from 'react'

interface Odd {
  id: string
  name: string
  value: string
}

interface Market {
  id: string
  name: string
  odds: Odd[]
}

interface Match {
  id: string
  sport: string
  country: string
  league: string
  date: Date
  time: string
  homeTeam: string
  awayTeam: string
  markets: Market[]
}

export function MatchDetail() {
  const [match, setMatch] = useState<Match | null>(null)

  const matchId = window.location.pathname.split('/')[4]

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <p> Esporte - País - Campeonato </p>
          <p> Data - Hora </p>
        </div>
        <p className="text-2xl font-bold">Time 1 x Time 2</p>
      </div>

      <div className="h-[250] w-full bg-red-600" />

      <Tabs>
        <TabList overflowX="auto" overflowY="hidden">
          <Tab>Popular</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Odds</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
