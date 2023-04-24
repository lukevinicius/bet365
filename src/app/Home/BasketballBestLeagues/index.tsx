import { Image, Spinner, Table, useBreakpointValue } from '@chakra-ui/react'
import { api } from '@/services/api/axios'
import { useBet } from '@/hooks/useBet'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiLockFill } from 'react-icons/ri'
import { formatTimeToUtc } from '@/utils/formatTimeToUtc'

import sport2 from '@/assets/images/sports/2.svg'

interface IResponse {
  leagueId: string
  league: string
  matches: {
    day: string
    match: {
      id: string
      localTeam: string
      visitorTeam: string
      date: string
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

export function BasketballBestLeagues() {
  const { selectedMatch, selectMarket } = useBet()
  const [data, setData] = useState<IResponse>({} as IResponse)
  const [loading, setLoading] = useState(true)

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  })

  async function findMatches() {
    const { data } = await api.get(`/basketball/matches-by-league`, {
      params: {
        leagueId: '1046',
      },
    })

    setData({
      leagueId: data.leagueId,
      league: data.league,
      matches: data.matches,
    })
    setLoading(false)
  }

  useEffect(() => {
    findMatches()
  }, [])

  return (
    <div>
      <div className={isWideVersion ? 'm-0' : 'm-1'}>
        <div className="flex items-center bg-blue-900 h-12 py-1 px-5 rounded-t-md">
          <Image src={sport2} className="mr-2 h-[32px] w-[32px]" alt="sport2" />
          <div className="flex items-center justify-between">
            <p className="font-bold">Basquete</p>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <Table>
            <thead>
              <tr className="items-center border-b-[1px] h-8 border-[#6e6e6e] bg-[#B1B1B1]">
                <th className="w-1/2 text-sm text-left text-gray-800 font-normal pl-2">
                  {data.league}
                </th>
                <th className="w-1/6 text-sm text-center text-gray-800 font-semibold">
                  {isWideVersion ? '1' : 'Casa'}
                </th>
                <th className="w-1/6 text-sm text-center text-gray-800 font-semibold">
                  {isWideVersion ? '2' : 'Visitante'}
                </th>
              </tr>
            </thead>
            {data.matches &&
              data.matches.map((match) => (
                <>
                  <tbody>
                    <tr>
                      <td className="bg-[#5f5f5f] text-sm text-[#c5c5c5] py-1 pl-2">
                        {match.day}
                      </td>
                      <td className="bg-[#5f5f5f]"></td>
                      <td className="bg-[#5f5f5f]"></td>
                    </tr>

                    {match.match.map((match) => (
                      <tr
                        key={match.id}
                        className="border-b-[1px] h-10 border-[#6e6e6e]"
                      >
                        {isWideVersion ? (
                          <td className="w-1/2  bg-[#646464] border-[#6e6e6e] border-r-[1px] pl-2">
                            <p>{match.localTeam}</p>
                            <p>{match.visitorTeam}</p>
                            <p>{match.time} </p>
                          </td>
                        ) : (
                          <td className="w-1/2 bg-[#646464] border-[#6e6e6e] border-r-[1px] pl-2">
                            <Link
                              to={`/sports/soccer/${data.leagueId}/${match.id}`}
                              className="hover:text-[#FFDF1B] text-[#c5c5c5]"
                            >
                              {match.time} -{' '}
                              <span className="text-zinc-200 hover:text-[#FFDF1B]">
                                {match.localTeam} X {match.visitorTeam}
                              </span>
                            </Link>
                          </td>
                        )}
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
                                    : 'bg-[#5A5A5A] hover:bg-[#646464] border-r-[1px] border-[#6e6e6e]'
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
                              odd.stop !== 'true' &&
                                selectMarket({
                                  id: match.id,
                                  leagueId: data.leagueId,
                                  localTeam: match.localTeam,
                                  visitorTeam: match.visitorTeam,
                                  date: formatTimeToUtc(
                                    match.date,
                                    match.time,
                                  ).toDate(),
                                  market,
                                })
                            }}
                          >
                            {odd.stop === 'true' ? (
                              <RiLockFill />
                            ) : (
                              <p>{odd.value}</p>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </>
              ))}
          </Table>
        )}
      </div>
    </div>
  )
}