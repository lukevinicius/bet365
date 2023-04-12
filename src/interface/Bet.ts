import { IMatch } from '@/domain/interfaces/IMatch'

export interface IBet {
  id: string
  stake: number
  jackpot: number
  status: string
  bets: IMatch[]
  createdAt: Date
  updatedAt: Date
}
