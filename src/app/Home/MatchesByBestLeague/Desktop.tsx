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
      <p className="bg-[#a0a0a0] py-1 px-5 text-zinc-700 text-sm">
        {data.date}
      </p>
      <div>
        {data.matches.map((match) => (
          <div key={match.id}>
            <div className="flex items-center border-b-[1px] border-[#6e6e6e]">
              <div className="w-1/2 h-9 bg-[#646464] py-2 px-5">
                <Link
                  to={`/sports/soccer/${data.leagueId}/${match.id}`}
                  className="w-full hover:text-[#ffdf1b]"
                >
                  <div className="flex w-full items-center space-x-3">
                    <div className="text-sm">{match.time}</div>
                    <p>
                      {match.localTeam} x {match.visitorTeam}
                    </p>
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
                                : 'bg-[#5A5A5A] hover:bg-[#646464] border-r-[1px] border-[#6e6e6e]'
                            }
                          flex flex-1 h-9 justify-center items-center
                              cursor-pointer text-[#ffdf1b]`}
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
