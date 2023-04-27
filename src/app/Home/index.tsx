'use client'

import { useBreakpointValue } from '@chakra-ui/react'
import { Carousel } from '@/app/Home/Carousel'
import { SportsList } from '@/app/Home/SportsList'
import { BestLeagues } from '@/app/Home/BestLeagues'
import { GamesByBestLeague } from '@/app/Home/MatchesByBestLeagues'
import { MatchesInPlay } from '@/app/Home/MatchesInPlay'
import { useCompany } from '@/hooks/useCompany'
import { EventsByMMA } from './mmaEvents'
import { BasketballBestLeagues } from './BasketballBestLeagues'
import { TennisBestLeagues } from './TennisBestLeagues'
import { EventsByBoxe } from './boxeEvents'

export function Home() {
  const { company } = useCompany()

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <div className="flex w-auto relative items-stretch h-full min-w-0">
      <div className="flex items-stretch w-full h-full">
        <div className={`sticky overflow-auto w-full overscroll-none`}>
          <aside className="shadow-[0 0 20px rgba(0,0,0,0.05)] w-full">
            <div
              className={` grid ${
                isWideVersion
                  ? 'grid-cols-1 bg-[#5a5a5a]'
                  : 'grid-cols-2 bg-[rgb(61,61,61)]'
              }
                `}
            >
              <div>
                {company.banners && <Carousel banners={company.banners} />}
                {isWideVersion && <SportsList />}
                <MatchesInPlay />
                {!isWideVersion && (
                  <>
                    <EventsByMMA />
                    <EventsByBoxe />
                  </>
                )}
                {isWideVersion && company.bestLeagues && (
                  <>
                    <GamesByBestLeague
                      leagueId={company.bestLeagues[0].leagueId}
                    />

                    <GamesByBestLeague
                      leagueId={company.bestLeagues[1].leagueId}
                    />
                  </>
                )}
              </div>
              <div>
                {company.bestLeagues && <BestLeagues />}
                {!isWideVersion && company.bestLeagues && (
                  <>
                    <GamesByBestLeague
                      leagueId={company.bestLeagues[0].leagueId}
                    />
                    <GamesByBestLeague
                      leagueId={company.bestLeagues[1].leagueId}
                    />
                  </>
                )}
                <BasketballBestLeagues />
                <TennisBestLeagues />
                {isWideVersion && (
                  <>
                    <EventsByMMA />
                    <EventsByBoxe />
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
