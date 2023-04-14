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
  Spinner,
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
  const leagueId = params[2]
  const matchId = params[3]
  const [match, setMatch] = useState<IMatch>({} as IMatch)
  const [loading, setLoading] = useState(true)

  async function getMatch() {
    await api
      .get('/soccer/match-by-id', {
        params: {
          leagueId,
          matchId,
        },
      })
      .then((response) => {
        setMatch(response.data)
        setLoading(false)
      })
  }

  useEffect(() => {
    getMatch()
  }, [])

  return (
    <div className="p-2">
      {loading ? (
        <div className="text-center">
          <Spinner size="xl" />
        </div>
      ) : (
        <>
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
                            <AccordionButton className="justify-between" px="0">
                              <div>{market.name}</div>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel
                            className={
                              market.odds.length < 4
                                ? 'flex justify-around'
                                : `${
                                    market.odds[0].odds
                                      ? ''
                                      : 'grid grid-cols-3'
                                  }`
                            }
                            px={0}
                            py={0}
                          >
                            {market.odds.map((odd, index) => (
                              <div
                                key={odd.name}
                                className="
                              w-full
                              border-r-[1px]"
                              >
                                {!odd.odds && odd.stop !== 'false' && (
                                  <div
                                    className="flex flex-1 h-9 justify-center items-center space-x-3 bg-[#646464] hover:bg-[#6e6e6e] 
                              cursor-pointer"
                                  >
                                    <p>{odd.name}</p>
                                    <p className="text-[#FFDF1B]">
                                      {odd.odd && odd.odd}
                                    </p>
                                  </div>
                                )}

                                {odd.odds && (
                                  <div className="w-full">
                                    {odd.odds[0] === odd.odds[index] && (
                                      <div className="flex flex-1 bg-[#505050]">
                                        {odd.name[0] === '+' ||
                                        odd.name[0] === '-' ? (
                                          <></>
                                        ) : (
                                          <div className="flex-1 text-center"></div>
                                        )}
                                        <div className="flex-1 text-center">
                                          {odd.odds[0].name === 'Home'
                                            ? match.localTeam
                                            : odd.odds[0].name === 'Over'
                                            ? 'Mais de'
                                            : odd.odds[0].name}
                                        </div>
                                        {odd.odds[2] && (
                                          <div className="flex-1 text-center">
                                            {odd.odds[2].name === 'Draw' &&
                                              'Empate'}
                                          </div>
                                        )}

                                        <div className="flex-1 text-center">
                                          {odd.odds[1].name === 'Away'
                                            ? match.visitorTeam
                                            : odd.odds[1].name === 'Under'
                                            ? 'Menos de'
                                            : odd.odds[1].name}
                                        </div>
                                      </div>
                                    )}
                                    <div className="flex flex-1">
                                      {odd.name[0] === '+' ||
                                      odd.name[0] === '-' ? (
                                        <></>
                                      ) : (
                                        <div className="flex flex-1 items-center justify-center bg-[#5F5F5F]">
                                          {odd.name}
                                        </div>
                                      )}

                                      {odd.odds.map((oddProps) => {
                                        return (
                                          <div
                                            className="flex flex-1 h-9 items-center justify-center bg-[#646464] hover:bg-[#6e6e6e] cursor-pointer"
                                            key={oddProps.name}
                                          >
                                            <p>
                                              {odd.name[0] === '+' ||
                                              odd.name[0] === '-' ? (
                                                <>{odd.name}</>
                                              ) : (
                                                <></>
                                              )}
                                              <span className="ml-2 text-[#FFDF1B]">
                                                {oddProps.odd}
                                              </span>
                                            </p>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  </div>
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
        </>
      )}
    </div>
  )
}
