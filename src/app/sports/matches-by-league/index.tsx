import { useEffect, useState } from 'react'

import { useBet } from '@/hooks/useBet'
import { api } from '@/services/api/axios'

import { Table, useBreakpointValue } from '@chakra-ui/react'

interface IResponse {
  leagueId: string
  league: string
  matches: {
    day: string
    match: {
      id: string
      localTeam: string
      visitorTeam: string
      date: Date
      time: string
      market: {
        id: string
        name: string
        stop: string
        odds: {
          name: string
          value: string
          stop: string
        }[]
      }
    }[]
  }[]
}

export function MatchesByLeague() {
  const { selectedMatch, selectMarket } = useBet()
  const [data, setData] = useState<IResponse>({} as IResponse)

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  })

  async function findMatches() {
    const leagueId = window.location.pathname.split('/')
    const { data } = await api.get('/find-matches-by-league', {
      params: {
        leagueId: leagueId[3],
      },
    })

    setData({
      leagueId: data.leagueId,
      league: data.league,
      matches: data.matches,
    })
  }

  useEffect(() => {
    findMatches()
  }, [])

  return (
    <div>
      {
        <Table>
          {data.matches &&
            data.matches.map((match) => (
              <>
                <thead>
                  <tr className="items-center border-b-[1px] h-8 border-[#6e6e6e] bg-[#B1B1B1]">
                    <th className="w-1/2 text-sm text-left text-gray-800 font-normal pl-2">
                      {match.day}
                    </th>
                    <th className="w-1/6 text-sm text-center text-gray-800 font-semibold">
                      {isWideVersion ? '1' : 'Casa'}
                    </th>
                    <th className="w-1/6 text-sm text-center text-gray-800 font-semibold">
                      {isWideVersion ? 'X' : 'Empate'}
                    </th>
                    <th className="w-1/6 text-sm text-center text-gray-800 font-semibold">
                      {isWideVersion ? '2' : 'Visitante'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {match.match.map((match) => (
                    <tr
                      key={match.id}
                      className="border-b-[1px] h-10 border-[#6e6e6e]"
                    >
                      <>
                        {isWideVersion ? (
                          <td className="w-1/2  bg-[#646464] border-[#6e6e6e] border-r-[1px] pl-2">
                            <p>{match.localTeam}</p>
                            <p>{match.visitorTeam}</p>
                            <p>{match.time} </p>
                          </td>
                        ) : (
                          <td className="w-1/2 bg-[#646464] border-[#6e6e6e] border-r-[1px] pl-2">
                            {match.time} -{' '}
                            <span>
                              {match.localTeam} X {match.visitorTeam}
                            </span>
                          </td>
                        )}
                      </>
                      {match.market.odds.map((odd) => (
                        <td
                          key={odd.name}
                          className={`
                            ${
                              selectedMatch.find(
                                (item) =>
                                  item.id === match.id &&
                                  item.market.find(
                                    (market) => market.option === odd.name,
                                  ),
                              )
                                ? 'bg-[#B1B1B1]'
                                : 'bg-[#646464] hover:bg-[#6e6e6e] border-r-[1px] border-[#6e6e6e]'
                            }
                          w-1/6 text-center text-[#FFDF1B] cursor-pointer`}
                          onClick={() => {
                            const market = [
                              {
                                id: match.market.id,
                                name: match.market.name,
                                option: odd.name,
                                odd: odd.value,
                              },
                            ]
                            selectMarket({
                              id: match.id,
                              leagueId: data.leagueId,
                              localTeam: match.localTeam,
                              visitorTeam: match.visitorTeam,
                              date: match.date,
                              market,
                            })
                          }}
                        >
                          {odd.value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </>
            ))}
        </Table>
      }
    </div>
  )
}
