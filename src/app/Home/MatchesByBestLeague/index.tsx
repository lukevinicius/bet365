import { useBreakpointValue } from '@chakra-ui/react'
import { useState } from 'react'
import { Desktop } from './Desktop'
import response from './data.json'
import { Mobile } from './Mobile'

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

interface IResponse {
  leagueId: number
  leagueName: string
  matchesByDate: IMatchByDate[]
}

export function GamesByBestLeague() {
  const [matches] = useState<IResponse>(response)

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <div>
      <div className="bg-blue-900 py-1 px-5 rounded-t-md">
        <p className="font-bold">Logo - {matches.leagueName}</p>
        <span>Sport - Country</span>
      </div>
      <div>
        {matches.matchesByDate.map((matchByDate) => (
          <div key={matchByDate.date}>
            {isWideVersion ? (
              <Mobile date={matchByDate.date} matches={matchByDate.matches} />
            ) : (
              <Desktop date={matchByDate.date} matches={matchByDate.matches} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
