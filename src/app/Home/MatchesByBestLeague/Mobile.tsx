import { useBet } from '@/hooks/useBet'
import { formatTimeToUtc } from '@/utils/formatTimeToUtc'
import 'dayjs/plugin/calendar'
import { RiLockFill } from 'react-icons/ri'

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
  matches: IMatch[]
}

export function Mobile({ leagueId, matches }: IMatchByDate) {
  const { selectedMatch, selectMarket } = useBet()

  return (
    <div>
      <div className="flex overflow-auto overscroll-none">
        {matches.map((match) => (
          <div className="w-64" key={match.id}>
            <div className="flex w-64 flex-col items-center border-r-[1px] border-[#6e6e6e]">
              <div className="w-full bg-[#5a5a5a] py-2 px-5">
                <Link
                  to={`/sports/soccer/${leagueId}/${match.id}`}
                  className="hover:text-[#ffdf1b]"
                >
                  <div className="h-20 space-y-2 text-sm items-center">
                    <div className="text-md">
                      <p>{match.localTeam}</p>
                      <p>{match.visitorTeam}</p>
                    </div>
                    <div className="flex text-sm space-x-2">
                      <p>{match.date}</p>
                      <p>{match.time}</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex w-full h-11 items-center justify-center">
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
                      ) && ' bg-[#B1B1B1]'
                    } flex flex-1 w-full h-11 items-center justify-center p-1 bg-[#646464] border-[#6e6e6e] border-r-[1px] text-[#ffdf1b]`}
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
                          leagueId,
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
                    <p>
                      <span className="text-white opacity-70 mr-1">
                        {odd.name === 'Home'
                          ? '1'
                          : odd.name === 'Draw'
                          ? 'X'
                          : '2'}
                      </span>
                      {odd.stop === 'true' ? (
                        <RiLockFill />
                      ) : (
                        <p>{odd.value}</p>
                      )}
                    </p>
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
