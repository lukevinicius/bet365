import { useEffect, useState } from 'react'
import { api } from '@/services/api/axios'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'

interface IMatch {
  sportName: string
  leagueName: string
  matchId: string
  localTeam: string
  visitorTeam: string
  date: Date
  markets: {
    marketId: string
    name: string
    stop: string
    odds: {
      name: string
      odd?: string
      stop: string
      odds?: {
        name: string
        odd: string
        stop: string
      }[]
    }[]
  }[]
}

export function MatchById() {
  const params = window.location.pathname.split('/')
  console.log(params[3])
  const [match, setMatch] = useState<IMatch>({} as IMatch)

  async function getMatch() {
    await api
      .get('/soccer/match-by-id', {
        params: {
          leagueId: '1005',
          matchId: '3312974',
        },
      })
      .then((response) => {
        setMatch(response.data)
      })
  }

  useEffect(() => {
    getMatch()
  }, [])

  return (
    <div className="p-2">
      <div className="bg-blue-900 p-2">
        <p className="font-bold text-xl">
          {match.localTeam} x {match.visitorTeam}
        </p>
        <p>
          {match.sportName} - {match.leagueName}
        </p>
      </div>
      <div>
        <Tabs>
          <p className="text-center bg-[#464646] py-2 font-medium">
            {new Date(match.date).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
              hour12: false,
              hour: 'numeric',
              minute: 'numeric',
            })}
          </p>
          <TabList
            overflowX="auto"
            overflowY="hidden"
            className="whitespace-nowrap"
          >
            <Tab>Todos</Tab>
            <Tab>Handicap</Tab>
            <Tab>Gols</Tab>
            <Tab>1° Tempo</Tab>
            <Tab>2° Tempo</Tab>
            <Tab>Escanteios</Tab>
            <Tab>Cartões</Tab>
            <Tab>Jogador</Tab>
            <Tab>Minutos</Tab>
            <Tab>Especial</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p="0">
              {match.markets &&
                match.markets.map((market) => (
                  <Accordion
                    defaultIndex={[0]}
                    allowMultiple
                    key={market.marketId}
                  >
                    <AccordionItem>
                      <h2>
                        <AccordionButton px="0">
                          <div>{market.name}</div>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel
                        className={
                          market.odds.length < 4
                            ? 'flex justify-around'
                            : `${
                                market.odds.length > 3 ? 'grid grid-cols-3' : ''
                              }`
                        }
                        px={0}
                        py={0}
                      >
                        {market.odds.map((odd) => (
                          <div
                            key={odd.name}
                            className="
                              flex
                              w-full
                              h-9
                              border-r-[1px]
                              cursor-pointer"
                          >
                            {!odd.odds && (
                              <div className="flex flex-1 justify-center items-center space-x-3 bg-[#646464] hover:bg-[#6e6e6e]">
                                <p>{odd.name}</p>
                                <p className="text-[#FFDF1B]">
                                  {odd.odd && odd.odd}
                                </p>
                              </div>
                            )}

                            {odd.odds && (
                              <table className="w-full">
                                <thead>
                                  <tr>
                                    <th className="text-left">space</th>
                                    <th className="text-right">Home</th>
                                    <th className="text-right">Away</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="text-left">{odd.name}</td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                          </div>
                        ))}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                ))}
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}
