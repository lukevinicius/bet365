import { useEffect, useState } from 'react'
import { api } from '@/services/api/axios'
import { useBreakpointValue } from '@chakra-ui/react'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

interface LeagueProps {
  leagueId: string
}

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

interface IResponse {
  leagueId: string
  name: string
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

export function GamesByBestLeague({ leagueId }: LeagueProps) {
  const [league, setLeague] = useState<IResponse>({} as IResponse)
  const [allMatches, setAllMatches] = useState<IMatch[]>([])

  async function getMatches() {
    await api
      .get('/soccer/matches-by-league', {
        params: {
          leagueId,
        },
      })
      .then((response) => {
        setLeague({
          leagueId: response.data.leagueId,
          name: response.data.league,
          matches: response.data.matches,
        })
        setAllMatches(
          response.data.matches.map((match: any) => match.match).flat(),
        )
      })
  }

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  })

  useEffect(() => {
    getMatches()
  }, [])

  return (
    <div className={isWideVersion ? 'm-0' : 'm-1'}>
      {league && (
        <div>
          <div className="bg-blue-900 h-12 py-1 px-5 rounded-t-md">
            <p className="font-bold p-0 text-sm">{league.name}</p>
            <span className="text-xs">
              Futebol - {league.name.split(':')[0]}
            </span>
          </div>
          <div>
            {league.matches && (
              <div>
                {isWideVersion ? (
                  <Mobile leagueId={league.leagueId} matches={allMatches} />
                ) : (
                  <>
                    {league.matches.map((match) => (
                      <Desktop
                        key={match.match[0].id}
                        leagueId={league.leagueId}
                        date={match.day}
                        matches={match.match}
                      />
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
