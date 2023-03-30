import { useBreakpointValue } from '@chakra-ui/react'
import { PopularCasinoGames } from './popular-games'
// import { JackpotGames } from './jackpot'
// import { SlotsGames } from './slots'

export function Casino() {
  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <div className={`${isWideVersion ? 'p-3' : 'p-10'} space-y-5 w-full`}>
      <p className="text-2xl font-medium">Cassino</p>
      <PopularCasinoGames />
      {/* <SlotsGames />
      <JackpotGames /> */}
    </div>
  )
}
