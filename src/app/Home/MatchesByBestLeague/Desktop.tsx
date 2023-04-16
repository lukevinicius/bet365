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
  date: string
  matches: IMatch[]
}

export function Desktop(data: IMatchByDate) {
  return (
    <div>
      <p className="bg-[#a0a0a0] py-1 px-5 font-bold">{data.date}</p>
      <div>
        {data.matches.map((match) => (
          <div key={match.id}>
            <div className="flex items-center border-b-[1px] border-[#6e6e6e]">
              <div className="flex-1 h-16 bg-[#646464] py-2 px-5">
                <Link to="#" className="hover:text-[#ffdf1b]">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm">{match.time}</div>
                    <div>
                      <p>{match.localTeam}</p>
                      <p>{match.visitorTeam}</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex flex-1 w-full items-center justify-center">
                {match.market.odds.map((odd) => (
                  <div
                    className="flex flex-1 w-full h-16 items-center justify-center p-1 border-r-[1px] bg-[#5a5a5a] hover:bg-[#6e6e6e] border-[#6e6e6e] text-[#ffdf1b]"
                    key={odd.name}
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
