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
  date: Date
  time: string
  market: IMarket
}

interface IMatchByDate {
  date: Date
  matches: IMatch[]
}

export function Desktop(data: IMatchByDate) {
  return (
    <div>
      <p className="bg-[#a0a0a0] py-1 px-5 font-bold">
        {new Date(data.date).toLocaleDateString('pt-BR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>
      <div>
        {data.matches.map((match) => (
          <div key={match.static_id}>
            <div className="flex items-center border-b-[1px] border-[#6e6e6e]">
              <div className="flex-1 h-16 bg-[#646464] py-2 px-5">
                <Link to="#" className="hover:text-[#ffdf1b]">
                  <div className="flex items-center space-x-3">
                    <div className="text-[0.8rem]">
                      <p>{match.time}</p>
                    </div>
                    <div>
                      <p>{match.localTeam.name}</p>
                      <p>{match.visitorTeam.name}</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex flex-1 w-full items-center justify-center">
                {match.market.odds.oddType.map((oddType) => (
                  <div
                    className="flex flex-1 w-full h-16 items-center justify-center p-1 border-r-[1px] bg-[#5a5a5a] hover:bg-[#6e6e6e] border-[#6e6e6e] text-[#ffdf1b]"
                    key={oddType.name}
                  >
                    <p>{oddType.value}</p>
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
