import { ReactNode, useState } from 'react'

import { BetContext } from '@/hooks/useBet'
import { api } from '@/services/api/axios'
import { IMatch } from '@/domain/interfaces/IMatch'
// import { api } from '@/services/api/axios'

interface BetProviderProps {
  children: ReactNode
}

interface Bet {
  id: string
  stake: number
  jackpot: number
  status: string
  matches: IMatch[]
  createdAt: Date
  updatedAt: Date
}

export function BetProvider({ children }: BetProviderProps) {
  const [bet, setBet] = useState<Bet>({} as Bet)
  const [selectedMatch, setSelectedMatch] = useState<IMatch[]>([])

  async function findBets() {
    const { data } = await api.get('/bets')
    setBet(data)
  }

  function selectMarket(match: IMatch) {
    const matchExists = selectedMatch.find((m) => m.id === match.id)

    if (matchExists) {
      const updatedMatch = selectedMatch.filter((m) => m.id !== match.id)

      setSelectedMatch([...updatedMatch, match])
    } else {
      setSelectedMatch([...selectedMatch, match])
    }
  }

  function handleRemoveMatch(match: IMatch) {
    const updatedMatch = selectedMatch.filter((m) => m.id !== match.id)

    setSelectedMatch(updatedMatch)
  }

  function handleRemoveAllMatches() {
    setSelectedMatch([])
  }

  return (
    <BetContext.Provider
      value={{
        bet,
        selectedMatch,
        selectMarket,
        handleRemoveMatch,
        handleRemoveAllMatches,
        findBets,
      }}
    >
      {children}
    </BetContext.Provider>
  )
}
