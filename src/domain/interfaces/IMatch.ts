export interface IMatch {
  id: string
  leagueId: string
  localTeam: string
  visitorTeam: string
  date: string
  time: string
  status?: string
  market: {
    id: string
    name: string
    option: string
    odd: string
  }
}
