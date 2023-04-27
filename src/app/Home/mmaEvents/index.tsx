import { useEffect, useState } from 'react'
import { api } from '@/services/api/axios'
import { formatTimeToUtc } from '@/utils/formatTimeToUtc'
import { RiLoader2Fill, RiLockFill } from 'react-icons/ri'
import { useBet } from '@/hooks/useBet'
import { Image, useBreakpointValue } from '@chakra-ui/react'
import sport117 from '@/assets/images/sports/117.svg'

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

export function EventsByMMA() {
  const { selectedMatch, selectMarket } = useBet()
  const [data, setData] = useState<IResponse>({} as IResponse)
  const [loading, setLoading] = useState(true)

  async function getEvents() {
    const { data } = await api.get(`/mma/find-leagues`)

    await api
      .get(`/mma/matches-by-league`, {
        params: {
          leagueId: data[0].leagues[0].id,
        },
      })
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
  }

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  })

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <div className="w-full px-1 pb-1">
      {loading ? (
        <div className="flex justify-center items-center">
          <RiLoader2Fill className="animate-spin text-4xl" />
        </div>
      ) : (
        <>
          <div className="flex bg-blue-900 h-12 py-1 rounded-t-md items-center">
            <Image
              src={sport117}
              className="mr-2 h-[32px] w-[32px]"
              alt="sport117"
            />
            <div>
              <p className="font-bold p-0 text-sm">{data.league}</p>
              <span className="text-xs">
                Boxe - {data.league.split(' ')[0]}
              </span>
            </div>
          </div>
          {data.matches &&
            data.matches.map((match) => (
              <>
                <div className="flex items-center border-b-[1px] h-8 border-[#6e6e6e] bg-[#A0A0A0]">
                  <div className="w-1/2 text-sm text-left text-gray-800 font-normal pl-2">
                    {match.day}
                  </div>
                </div>
                {match.match.map((match) => (
                  <div
                    key={match.id}
                    className="flex border-b-[1px] border-[#6e6e6e]"
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
