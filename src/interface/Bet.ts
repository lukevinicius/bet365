import { IMatch } from '@/domain/interfaces/IMatch'

export interface IBet {
  id: string
  stake: number
  jackpot: number
  status: string
  matches: IMatch[]
  createdAt: Date
  updatedAt: Date
}
