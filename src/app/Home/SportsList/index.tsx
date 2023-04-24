import { Image } from '@chakra-ui/react'

import sport1 from '@/assets/images/sports/1.svg'
import sport2 from '@/assets/images/sports/2.svg'
import sport3 from '@/assets/images/sports/3.svg'
import sport5 from '@/assets/images/sports/5.svg'
import sport6 from '@/assets/images/sports/6.svg'
import sport10 from '@/assets/images/sports/10.svg'
import sport16 from '@/assets/images/sports/16.svg'
import sport20 from '@/assets/images/sports/20.svg'
import sport23 from '@/assets/images/sports/23.svg'
import sport29 from '@/assets/images/sports/29.svg'
import sport117 from '@/assets/images/sports/117.svg'

import { Link } from 'react-router-dom'

export function SportsList() {
  return (
    <div className="flex m-0 items-center px-1 overflow-x-scroll scrollbar-none bg-[#5a5a5a]">
      <Link to={`/sports/${'soccer'}`}>
        <div className="w-20 text-center justify-center text-[#fff]">
          <Image
            src={sport1}
            className="block m-auto h-[32px] w-[32px]"
            alt="sport1"
          />
          <p className="text-sm">Futebol</p>
        </div>
      </Link>
      <Link to={`/sports/${'basketball'}`}>
        <div className="w-20 text-center justify-center text-[#fff]">
          <Image
            src={sport2}
            className="block m-auto h-[32px] w-[32px]"
            alt="sport2"
          />
          <p className="text-sm">Basquete</p>
        </div>
      </Link>
      <Link to={`/sports/${'tennis'}`}>
        <div className="w-20 text-center justify-center text-[#fff]">
          <Image
            src={sport5}
            className="block m-auto h-[32px] w-[32px]"
            alt="sport5"
          />
          <p className="text-sm">Tênis</p>
        </div>
      </Link>
      <Link to={`/sports/${'table-tennis'}`}>
        <div className="text-center justify-center text-[#fff] w-20">
          <Image
            src={sport20}
            className="block m-auto h-[32px] w-[32px]"
            alt="sport20"
          />
          <p className="text-sm whitespace-nowrap">Tênis de Mesa</p>
        </div>
      </Link>
      <Link to={`/sports/${'volleyball'}`}>
        <div className="text-center justify-center text-[#fff] w-20">
          <Image
            src={sport23}
            className="block m-auto h-[32px] w-[32px]"
            alt="sport6"
          />
          <p className="text-sm">Vôlei</p>
        </div>
      </Link>
      <Link to={`/sports/${'handball'}`}>
        <div className="text-center justify-center text-[#fff] w-20">
          <Image
            src={sport6}
            className="block m-auto h-[32px] w-[32px]"
            alt="sport6"
          />
          <p className="text-sm">Handebol</p>
        </div>
      </Link>
      <Link to={`/sports/${'baseball'}`}>
        <div className="text-center justify-center text-[#fff] w-20">
          <Image
            src={sport3}
            className="block m-auto h-[32px] w-[32px]"
            alt="sport3"
          />
          <p className="text-sm">Basebol</p>
        </div>
      </Link>
      <Link to={`/sports/${'american-football'}`}>
        <div className="text-center justify-center text-[#fff] w-20">
          <Image
            src={sport16}
            className="block m-auto h-[32px] w-[32px]"
            alt="sport16"
          />
          <p className="text-sm">Futebol Americano</p>
        </div>
      </Link>
      {/* <div >
        <Image
          src={sport40}
          className="block m-auto h-[32px] w-[32px]"
          alt="sport40"
        />
        <p className="whitespace-nowrap">Formula 1</p>
      </div> */}
      <Link to={`/sports/${'mma'}`}>
        <div className="text-center justify-center text-[#fff] w-20">
          <Image
            src={sport117}
            className="block m-auto h-[32px] w-[32px]"
            alt="sport117"
          />
          <p className="text-sm">MMA</p>
        </div>
      </Link>
      <Link to={`/sports/${'boxe'}`}>
        <div className="text-center justify-center text-[#fff] w-20">
          <Image
            src={sport10}
            className="block m-auto h-[32px] w-[32px]"
            alt="sport10"
          />
          <p className="text-sm">Boxe</p>
        </div>
      </Link>
      {/* <div >
        <Image
          src={eSports}
          className="block m-auto h-[32px] w-[32px]"
          alt="eSports"
        />
        <p className="whitespace-nowrap">E-Sports</p>
      </div> */}
      <Link to={`/sports/${'futsal'}`}>
        <div className="text-center justify-center text-[#fff] w-20">
          <Image
            src={sport29}
            className="block m-auto h-[32px] w-[32px]"
            alt="sport29"
          />
          <p className="text-sm">Futsal</p>
        </div>
      </Link>
    </div>
  )
}
