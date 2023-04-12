export interface IMatch {
  id: string
  leagueId: string
  localTeam: string
  visitorTeam: string
  date: Date
  status?: string
  market: {
    id: string
    name: string
    option: string
    status?: string
    odd: string
  }[]
}
