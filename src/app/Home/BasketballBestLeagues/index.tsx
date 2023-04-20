import { Image, useBreakpointValue } from '@chakra-ui/react'
import sport2 from '@/assets/images/sports/2.svg'

export function BasketballBestLeagues() {
  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <div className={isWideVersion ? 'm-0' : 'm-1'}>
      <div className="flex items-center bg-blue-900 h-12 py-1 px-5 rounded-t-md">
        <Image src={sport2} className="mr-2 h-[32px] w-[32px]" alt="sport2" />
        <div className="flex items-center justify-between">
          <p className="font-bold">Basquete</p>
        </div>
      </div>
    </div>
  )
}
