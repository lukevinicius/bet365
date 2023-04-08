interface BestLeagues {
  country: string
  leagueId: string
  name: string
  status: boolean
  favorite: boolean
}

export interface ICompany {
  id: string
  name: string
  logo: string
  cnpj: string
  shieldTeams: {
    image?: string
    link?: string
  }[]
  banners: {
    image: string
    link: string
  }[]
  institutional: {
    instagram?: string
    youtube?: string
    facebook?: string
    twitch?: string
    tiktok?: string
    twitter?: string
    telegram?: string
    whatsapp?: string
  }
  bestLeagues: BestLeagues[]
}
