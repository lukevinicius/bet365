import { Image } from '@chakra-ui/react'

export function Casino() {
  return (
    <div className="p-10 space-y-5">
      <p className="text-2xl font-bold">Cassino</p>
      <div>
        <p className="text-lg font-semibold mb-5">Populares no momento</p>
        <div>
          <div>
            <Image
              className="w-[270px] h-[150px] object-cover rounded-2xl"
              src="https://www.mktesportivo.com/wp-content/uploads/2023/03/avi2.jpeg"
              alt="teste1"
            />
            <div className="p-2">
              <p className="text-md font-bold">Aviator</p>
              <p className="text-md">Spribe</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-lg font-medium">Slots</p>
      <p className="text-lg font-medium">Jackpots</p>
    </div>
  )
}
