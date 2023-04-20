interface SoccerInplayHomeProps {
  matches: {
    id: string
    localTeam: {
      name: string
      score: string
      redCards: string
      yellowCards: string
      corners: string
    }
    visitorTeam: {
      name: string
      score: string
      redCards: string
      yellowCards: string
      corners: string
    }
    time: string
    market: {
      id: string
      name: string
      stop: string
      odds: {
        name: string
        odd?: string
        stop: string
        odds?: {
          name: string
          odd: string
          stop: string
        }[]
      }[]
    }[]
  }[]
}

export function SoccerInplayHome({ matches }: SoccerInplayHomeProps) {
  return (
    <div>
      <div className="flex items-center border-b-[1px] border-[#6e6e6e] bg-[#a0a0a0] font-bold text-sm">
        <p className="w-1/2 py-1 px-3 font-bold">Futebol</p>
        <div className="flex w-1/2 text-center">
          <p className="w-1/3">1</p>
          <p className="w-1/3">X</p>
          <p className="w-1/3">2</p>
        </div>
      </div>
      {matches.map((match) => (
        <div className="flex border-b-[1px] border-[#6e6e6e]" key={match.id}>
          <div className="w-1/2 h-16 py-1 px-3 border-r-[1px] border-[#6e6e6e] bg-[#646464]">
            <div className="flex space-x-3 items-center">
              <div className="w-full">
                <div className="flex justify-between text-sm">
                  <p>{match.localTeam.name}</p>
                  <p className="font-bold">{match.localTeam.score}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>{match.visitorTeam.name}</p>
                  <p className="font-bold">{match.visitorTeam.score}</p>
                </div>
                <p className="text-xs">{match.time}</p>
              </div>
            </div>
          </div>
          <div className="flex w-1/2 h-16 bg-[#5a5a5a] text-[#ffdf1b]">
            <p className="flex w-1/3 p-1 items-center justify-center border-r-[1px] border-[#6e6e6e]">
              {match.market[0].odds[0].odd}
            </p>
            <p className="flex w-1/3 p-1 items-center justify-center border-r-[1px] border-[#6e6e6e]">
              {match.market[0].odds[1].odd}
            </p>
            <p className="flex w-1/3 p-1 items-center justify-center border-r-[1px] border-[#6e6e6e]">
              {match.market[0].odds[2].odd}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
