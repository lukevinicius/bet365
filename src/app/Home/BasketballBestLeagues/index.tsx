import { Image, Spinner, useBreakpointValue } from '@chakra-ui/react'
import { api } from '@/services/api/axios'
import { useBet } from '@/hooks/useBet'
import { useEffect, useState } from 'react'
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
    <div className="w-full px-1 pb-1">
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
        <>
          <div className="flex items-center border-b-[1px] h-6 border-[#6e6e6e] bg-[#A0A0A0]">
            <p className="text-sm text-left text-gray-800 font-normal pl-2">
              {data.league}
            </p>
          </div>
          {data.matches &&
            data.matches.map((match) => (
              <>
                <div className="bg-[#5f5f5f] text-sm text-[#c5c5c5] py-1 pl-2">
                  {match.day}
                </div>

                {match.match.map((match) => (
                  <div
                    key={match.id}
                    className="flex border-b-[1px] bg-[#646464] border-[#6e6e6e]"
                  >
                    <div className="w-1/2 items-center bg-[#646464] border-[#A0A0A0] border-r-[1px] pl-2">
                      {isWideVersion ? (
                        <div className="h-16">
                          <p className="text-sm">{match.localTeam}</p>
                          <p className="text-sm">{match.visitorTeam}</p>
                          <p className="text-sm">{match.time}</p>
                        </div>
                      ) : (
                        <div className="flex h-10 items-center">
                          {match.time} -{' '}
                          <span>
                            {match.localTeam} x {match.visitorTeam}
                          </span>
                        </div>
                      )}
                    </div>
                    {match.market.odds.map((odd) => (
                      <div
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
                      ${
                        match.market.odds.length > 2 ? 'w-1/6' : 'w-1/4'
                      } flex items-center justify-center text-[#FFDF1B] cursor-pointer`}
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
                      </div>
                    ))}
                  </div>
                ))}
              </>
            ))}
        </>
      )}
    </div>
  )
}
