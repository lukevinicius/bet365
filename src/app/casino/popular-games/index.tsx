import { Image } from '@chakra-ui/react'

export function PopularCasinoGames() {
  return (
    <div>
      <p className="text-lg font-medium mb-5">Populares no momento</p>
      <div className="flex space-x-3 overflow-auto">
        <div>
          <Image
            className="w-[300px] h-[200px] object-cover rounded-2xl"
            src="https://www.mktesportivo.com/wp-content/uploads/2023/03/avi2.jpeg"
            alt="teste1"
          />
          <div className="p-2 w-[300px]">
            <p className="text-md font-bold">Aviator</p>
            <p className="text-md">Spribe</p>
          </div>
        </div>
        <div>
          <Image
            className="w-[300px] h-[200px] object-cover rounded-2xl"
            src="https://cdn.hub88.io/pragmatic/pgp_spaceman.jpg"
            alt="teste1"
          />
          <div className="p-2 w-[300px]">
            <p className="text-md font-bold">Spaceman</p>
            <p className="text-md">PragmactPlay</p>
          </div>
        </div>
      </div>
    </div>
  )
}
