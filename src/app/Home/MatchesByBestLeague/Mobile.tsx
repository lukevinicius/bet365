import { Link } from 'react-router-dom'

interface IOddType {
  name: string
  value: string
}

interface IMarket {
  marketId: string
  marketName: string
  stop: boolean
  odds: {
    bookmakerId: string
    stop: boolean
    oddType: IOddType[]
  }
}

interface IMatch {
  static_id: string
  localTeam: {
    id: string
    name: string
  }
  visitorTeam: {
    id: string
    name: string
  }
  date: string
  time: string
  market: IMarket
}

interface IMatchByDate {
  date: string
  matches: IMatch[]
}

export function Mobile(data: IMatchByDate) {
  return (
    <div>
      <p className="bg-[#a0a0a0] py-1 px-5 font-bold">{data.date}</p>
      <div className="flex overflow-auto overscroll-none">
        {data.matches.map((match) => (
          <div className="w-64" key={match.static_id}>
            <div className="flex w-64 flex-col items-center border-r-[1px] border-[#6e6e6e]">
              <div className="flex-1 w-full bg-[#646464] py-2 px-5">
                <Link to="#" className="hover:text-[#ffdf1b]">
                  <div className="h-20 space-y-2 text-[0.8rem] items-center">
                    <div>
                      <p>{match.localTeam.name}</p>
                      <p>{match.visitorTeam.name}</p>
                    </div>
                    <p>Hoje 16:30</p>
                  </div>
                </Link>
              </div>
              <div className="flex flex-1 w-full h-16 items-center justify-center">
                {match.market.odds.oddType.map((oddType) => (
                  <div
                    className="flex flex-1 w-full h-16 items-center justify-center p-1 border-r-[1px] bg-[#5a5a5a] hover:bg-[#6e6e6e] border-[#6e6e6e] text-[#ffdf1b]"
                    key={oddType.name}
                  >
                    <p>
                      <span className="text-white opacity-70">
                        {oddType.name}{' '}
                      </span>
                      {oddType.value}
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
