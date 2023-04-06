interface Match {
  staticId: string
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

export interface IBet {
  id: string
  stake: number
  jackpot: number
  status: string
  matches: Match[]
  createdAt: Date
  updatedAt: Date
}
