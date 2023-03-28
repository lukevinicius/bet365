import { Logo } from '../Header/Logo'

import flamengo from '@/assets/images/teams/flamengo.svg'
import barcelonaSvg from '@/assets/images/teams/barcelona.svg'
import realmadridSvg from '@/assets/images/teams/realmadrid.svg'
import manchesterSvg from '@/assets/images/teams/manchester.svg'
import { Link } from 'react-router-dom'
// import { RiInstagramLine, RiTwitterFill, RiYoutubeFill } from 'react-icons/ri'
import { Powered } from './Powered'
import { Complience } from './Complience'
import { Box, Image } from '@chakra-ui/react'

export function Footer() {
  // const sizeIcon = 32

  return (
    <footer className="py-5 text-center text-white bg-[#2b2b2b]">
      <div className="flex mt-10 justify-center items-center">
        <Logo />
      </div>

      <div className="my-10">
        <b>Patrocinador Oficial:</b>
        <div className="flex flex-row flex-wrap justify-center text-center mt-10">
          <Image src={flamengo} alt="Logo Flamengo" className="h-16 w-16" />
          <Image
            src={barcelonaSvg}
            alt="Logo Barcelona"
            className="h-16 w-16"
          />
          <Image
            src={realmadridSvg}
            alt="Logo Real Madrid"
            className="h-16 w-16"
          />
          <Image
            src={manchesterSvg}
            alt="Logo Manchester"
            className="h-16 w-16"
          />
        </div>
        {/* <HStack mt="10" justify="center" className="shields">
          {company.shields?.map(shield => (
            <Link
              href={`${shield.link}`}
              key={shield.image}
            >
              <Image
                h="100px"
                src={`https://rsa-api.s3.sa-east-1.amazonaws.com/shield/${shield.image}`}
                alt="Logo guarani"
              />
            </Link>
          ))}
        </HStack> */}
        {/* <div className="flex space-x-10 my-10 justify-center">
          {company.institutional?.instagram && (
            <Link href={`${company.institutional.instagram}`} isExternal>
              <RiInstagramLine size={sizeIcon} />
            </Link>
          )}
          {company.institutional?.youtube && (
            <Link href={`${data.institutional.youtube}`} isExternal>
              <RiYoutubeFill size={sizeIcon} />
            </Link>
          )}
          {company.institutional?.facebook && (
            <Link href={`${data.institutional.facebook}`} isExternal>
              <RiFacebookCircleFill size={sizeIcon} />
            </Link>
          )}
          {company.institutional?.twitch && (
            <Link href={`${data.institutional.twitch}`} isExternal>
              <RiTwitterFill size={sizeIcon} />
            </Link>
          )}
          {company.institutional?.tiktok && (
            <Link href={`${data.institutional.tiktok}`} isExternal>
              <RiTwitterFill size={sizeIcon} />
            </Link>
          )}
          {company.institutional?.twitter && (
            <Link href={`${data.institutional.twitter}`} isExternal>
              <RiTwitterFill size={sizeIcon} />
            </Link>
          )}
          {company.institutional?.telegram && (
            <Link href={`${data.institutional.telegram}`} isExternal>
              <RiTelegramFill size={sizeIcon} />
            </Link>
          )}
          {company.institutional?.whatsapp && (
            <Link href={`${data.institutional.whatsapp}`} isExternal>
              <RiTelegramFill size={sizeIcon} />
            </Link>
          )}
        </div> */}
      </div>

      <Box
        borderTop="1px solid rgba(128, 229, 255, 0.2)"
        borderBottom="1px solid rgba(128, 229, 255, 0.2)"
        className="flex space-x-16 my-10 justify-center py-5"
      >
        <div className="text-left">
          <p className="font-bold text-white">Apostas</p>
          <div className="flex mt-5 flex-col space-y-3">
            <Link to="/#" className="font-[0.9rem]">
              Esportes
            </Link>
            <Link to="/#" className="font-[0.9rem]">
              Ao Vivo
            </Link>
            <Link to="/#" className="font-[0.9rem]">
              E-Sports
            </Link>
            <Link to="/#" className="font-[0.9rem]">
              Cassino
            </Link>
          </div>
        </div>
        <div className="text-left">
          <p className="font-bold ">Comunidade</p>
          <div className="flex mt-5 flex-col space-y-3">
            <Link to="/#">Jogo Responsável</Link>
            <Link to="/#">Regras Gerais</Link>
            <Link to="/#">FAQ</Link>
            <Link to="/#">Ajuda</Link>
          </div>
        </div>
        {/* <div>
          <p className="font-bold">Redes Sociais</p>
          <div className="flex space-x-10 mt-5 justify-center">
            <RiInstagramLine size={sizeIcon} />
            <RiYoutubeFill size={sizeIcon} />
            <RiTwitterFill size={sizeIcon} />
          </div>
        </div> */}
      </Box>

      <Complience />
      <Powered />
    </footer>
  )
}
