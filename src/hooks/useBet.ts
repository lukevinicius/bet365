import { useContext, createContext } from 'react'

interface Match {
  id: string
  leagueId: string
  localTeam: string
  visitorTeam: string
  date: string
  time: string
  market: {
    id: string
    name: string
    option: string
    odd: string
  }
}

interface BetContextData {
  bet: {
    id: string
    stake: number
    jackpot: number
    status: string
    matches: Match[]
    createdAt: Date
    updatedAt: Date
  }
  selectedMatch: Match[]
  handleRemoveMatch(match: Match): void
  handleRemoveAllMatches(): void
  selectMarket(match: Match): void
  findBets(): Promise<void>
}

export const BetContext = createContext({} as BetContextData)

export function useBet() {
  const context = useContext(BetContext)

  return context
}
