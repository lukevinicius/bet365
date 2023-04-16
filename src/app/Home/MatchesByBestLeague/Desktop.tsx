import { useBet } from '@/hooks/useBet'
import { formatTimeToUtc } from '@/utils/formatTimeToUtc'
import { Link } from 'react-router-dom'

interface IMatch {
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
}

interface IMatchByDate {
  leagueId: string
  date: string
  matches: IMatch[]
}

export function Desktop(data: IMatchByDate) {
  const { selectedMatch, selectMarket } = useBet()

  return (
    <div>
      <p className="bg-[#a0a0a0] py-1 px-5 font-bold">{data.date}</p>
      <div>
        {data.matches.map((match) => (
          <div key={match.id}>
            <div className="flex items-center border-b-[1px] border-[#6e6e6e]">
              <div className="w-1/2 h-16 bg-[#646464] py-2 px-5">
                <Link
                  to={`/sports/soccer/${data.leagueId}/${match.id}`}
                  className="hover:text-[#ffdf1b]"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-sm">{match.time}</div>
                    <div>
                      <p>{match.localTeam}</p>
                      <p>{match.visitorTeam}</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex w-1/2 items-center justify-center">
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
                                : 'bg-[#646464] hover:bg-[#6e6e6e] border-r-[1px] border-[#6e6e6e]'
                            }
                          flex w-1/3 justify-center items-center h-16 text-[#FFDF1B] cursor-pointer`}
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
                        date: formatTimeToUtc(match.date, match.time).toDate(),
                        market,
                      })
                    }}
                  >
                    <p>{odd.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
