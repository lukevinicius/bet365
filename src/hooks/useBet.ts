import { IMatch } from '@/domain/interfaces/IMatch'
import { useContext, createContext } from 'react'

interface BetContextData {
  bet: {
    id: string
    stake: number
    jackpot: number
    status: string
    matches: IMatch[]
    createdAt: Date
    updatedAt: Date
  }
  selectedMatch: IMatch[]
  handleRemoveMatch(match: IMatch): void
  handleRemoveAllMatches(): void
  selectMarket(match: IMatch): void
  findBets(): Promise<void>
}

export const BetContext = createContext({} as BetContextData)

export function useBet() {
  const context = useContext(BetContext)

  return context
}
