import { Image } from '@chakra-ui/react'

import sport1 from '@/assets/images/sports/1.svg'
import sport2 from '@/assets/images/sports/2.svg'
import sport3 from '@/assets/images/sports/3.svg'
import sport6 from '@/assets/images/sports/6.svg'
import sport20 from '@/assets/images/sports/20.svg'
import sport40 from '@/assets/images/sports/40.svg'
import sport117 from '@/assets/images/sports/117.svg'
import eSports from '@/assets/images/sports/eSports.svg'
import { Link } from 'react-router-dom'

export function SportsList() {
  return (
    <div className="flex my-2 mx-2 space-x-4 overflow-auto scrollbar-none">
      <Link to="/sports/1" className="text-center justify-center text-[#fff]">
        <Image
          src={sport1}
          className="block m-auto h-[40px] w-[40px]"
          alt="sport1"
        />
        <p>Futebol</p>
      </Link>
      <div className="text-center justify-center text-[#fff]">
        <Image
          src={sport2}
          className="block m-auto h-[40px] w-[40px]"
          alt="sport2"
        />
        <p>Basquete</p>
      </div>
      <div className="text-center justify-center text-[#fff]">
        <Image
          src={sport3}
          className="block m-auto h-[40px] w-[40px]"
          alt="sport3"
        />
        <p>Basebol</p>
      </div>
      <div className="text-center justify-center text-[#fff]">
        <Image
          src={sport6}
          className="block m-auto h-[40px] w-[40px]"
          alt="sport6"
        />
        <p>Handebol</p>
      </div>
      <div className="text-center justify-center text-[#fff]">
        <Image
          src={sport20}
          className="block m-auto h-[40px] w-[40px]"
          alt="sport20"
        />
        <p className="whitespace-nowrap">Tênis de Mesa</p>
      </div>
      <div className="text-center justify-center text-[#fff]">
        <Image
          src={sport40}
          className="block m-auto h-[40px] w-[40px]"
          alt="sport40"
        />
        <p className="whitespace-nowrap">Formula 1</p>
      </div>
      <div className="text-center justify-center text-[#fff]">
        <Image
          src={sport117}
          className="block m-auto h-[40px] w-[40px]"
          alt="sport117"
        />
        <p>MMA</p>
      </div>
      <div className="text-center justify-center text-[#fff]">
        <Image
          src={eSports}
          className="block m-auto h-[40px] w-[40px]"
          alt="eSports"
        />
        <p className="whitespace-nowrap">E-Sports</p>
      </div>
    </div>
  )
}
