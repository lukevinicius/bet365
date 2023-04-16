import 'dayjs/plugin/calendar'

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
  matches: IMatch[]
}

export function Mobile({ matches }: IMatchByDate) {
  return (
    <div>
      <div className="flex overflow-auto overscroll-none">
        {matches.map((match) => (
          <div className="w-64" key={match.id}>
            <div className="flex w-64 flex-col items-center border-r-[1px] border-[#6e6e6e]">
              <div className="flex-1 w-full bg-[#646464] py-2 px-5">
                <Link to="#" className="hover:text-[#ffdf1b]">
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
              <div className="flex flex-1 w-full h-16 items-center justify-center">
                {match.market.odds.map((odd) => (
                  <div
                    className="flex flex-1 w-full h-16 items-center justify-center p-1 border-r-[1px] bg-[#5a5a5a] hover:bg-[#6e6e6e] border-[#6e6e6e] text-[#ffdf1b]"
                    key={odd.name}
                  >
                    <p>
                      <span className="text-white opacity-70 mr-1">
                        {odd.name === 'Home'
                          ? '1'
                          : odd.name === 'Draw'
                          ? 'X'
                          : '2'}
                      </span>
                      {odd.value}
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
