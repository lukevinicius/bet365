import { Image } from '@chakra-ui/react'

import sport1 from '@/assets/images/sports/1.svg'
import sport2 from '@/assets/images/sports/2.svg'
import sport3 from '@/assets/images/sports/3.svg'
import sport5 from '@/assets/images/sports/5.svg'
import sport6 from '@/assets/images/sports/6.svg'
import sport20 from '@/assets/images/sports/20.svg'
// import sport40 from '@/assets/images/sports/40.svg'
import sport117 from '@/assets/images/sports/117.svg'
// import eSports from '@/assets/images/sports/eSports.svg'
import { Link } from 'react-router-dom'

export function SportsList() {
  return (
    <div className="flex m-0 items-center py-2 px-1 space-x-4 overflow-x-scroll scrollbar-none bg-[#5a5a5a]">
      <Link
        to={`/sports/${'soccer'}`}
        className="text-center justify-center text-[#fff] w-20"
      >
        <Image
          src={sport1}
          className="block m-auto h-[32px] w-[32px]"
          alt="sport1"
        />
        <p className="text-sm">Futebol</p>
      </Link>
      <Link
        to={`/sports/${'basketball'}`}
        className="text-center justify-center text-[#fff]"
      >
        <Image
          src={sport2}
          className="block m-auto h-[32px] w-[32px]"
          alt="sport2"
        />
        <p className="text-sm">Basquete</p>
      </Link>
      <Link
        to={`/sports/${'tennis'}`}
        className="text-center justify-center text-[#fff]"
      >
        <Image
          src={sport5}
          className="block m-auto h-[32px] w-[32px]"
          alt="sport5"
        />
        <p className="text-sm">Tênis</p>
      </Link>
      <Link
        to={`/sports/${'baseball'}`}
        className="text-center justify-center text-[#fff]"
      >
        <Image
          src={sport3}
          className="block m-auto h-[32px] w-[32px]"
          alt="sport3"
        />
        <p className="text-sm">Basebol</p>
      </Link>
      <Link
        to={`/sports/${'handball'}`}
        className="text-center justify-center text-[#fff]"
      >
        <Image
          src={sport6}
          className="block m-auto h-[32px] w-[32px]"
          alt="sport6"
        />
        <p className="text-sm">Handebol</p>
      </Link>
      <Link
        to={`/sports/${'table-tennis'}`}
        className="text-center justify-center text-[#fff]"
      >
        <Image
          src={sport20}
          className="block m-auto h-[32px] w-[32px]"
          alt="sport20"
        />
        <p className="whitespace-nowrap">Tênis de Mesa</p>
      </Link>
      {/* <div className="text-center justify-center text-[#fff]">
        <Image
          src={sport40}
          className="block m-auto h-[32px] w-[32px]"
          alt="sport40"
        />
        <p className="whitespace-nowrap">Formula 1</p>
      </div> */}
      <Link
        to={`/sports/${'mma'}`}
        className="text-center justify-center text-[#fff]"
      >
        <Image
          src={sport117}
          className="block m-auto h-[32px] w-[32px]"
          alt="sport117"
        />
        <p className="text-sm">MMA</p>
      </Link>
      {/* <div className="text-center justify-center text-[#fff]">
        <Image
          src={eSports}
          className="block m-auto h-[32px] w-[32px]"
          alt="eSports"
        />
        <p className="whitespace-nowrap">E-Sports</p>
      </div> */}
    </div>
  )
}
