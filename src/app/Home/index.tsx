'use client'

import { useBreakpointValue } from '@chakra-ui/react'
import { Carousel } from '@/app/Home/Carousel'
import { SportsList } from '@/app/Home/SportsList'
import { BestLeagues } from '@/app/Home/BestLeagues'
import { GamesByBestLeague } from '@/app/Home/MatchesByBestLeague'
import { MatchesInPlay } from '@/app/Home/MatchesInPlay'
import { useCompany } from '@/hooks/useCompany'

export function Home() {
  const { company } = useCompany()

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <div className="flex w-auto relative items-stretch h-full min-w-0">
      <div className="flex items-stretch w-full h-full">
        <div className={`sticky  overflow-auto w-full overscroll-none`}>
          <aside className="shadow-[0 0 20px rgba(0,0,0,0.05)] w-full">
            <div
              className={`bg-[rgb(61,61,61)] grid space-x-1 space-y-1 ${
                isWideVersion ? 'grid-cols-1' : 'grid-cols-2'
              }
                `}
            >
              <div className={`${!isWideVersion && 'p-1'}`}>
                {company.banners && <Carousel banners={company.banners} />}
              </div>
              <div className={`${!isWideVersion && 'p-1'}`}>
                {isWideVersion && <SportsList />}
              </div>
              <div>
                <BestLeagues />
              </div>
              <div>
                <MatchesInPlay />
              </div>
              <div>
                <GamesByBestLeague />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
