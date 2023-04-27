import { Image } from '@chakra-ui/react'
import sport5 from '@/assets/images/sports/5.svg'

export function TennisBestLeagues() {
  const show = false

  return (
    <>
      {show && (
        <div className="w-full px-1 pb-1">
          <div className="flex items-center bg-blue-900 h-12 py-1 px-5 rounded-t-md">
            <Image
              src={sport5}
              className="mr-2 h-[32px] w-[32px]"
              alt="sport5"
            />
            <div className="flex items-center justify-between">
              <p className="font-bold">Tênis</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
