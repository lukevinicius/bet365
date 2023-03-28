import { Image } from '@chakra-ui/react'

import curacaoLogo from '@/assets/images/curacao.png'
import ageSvg from '@/assets/images/footer/18.svg'
import { useCompany } from '@/hooks/useCompany'
import { useBreakpointValue } from '@chakra-ui/react'

export function Complience() {
  const { company } = useCompany()

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <div className="flex items-center mx-8">
      <div className="flex mt-5 w-1/12 space-y-5 mr-3 flex-row flex-wrap">
        <Image
          src={ageSvg}
          alt="Logo Master"
          className={`${isWideVersion ? 'w-full h-4' : 'w-full h-20'}`}
        />
        <Image
          src={curacaoLogo}
          alt="Logo Paypal"
          className={`${isWideVersion ? 'w-full' : 'w-full'}`}
        />
      </div>
      <div className={`w-11/12  ${isWideVersion && 'text-[0.6rem]'}`}>
        <p className="text-justify">
          {company.name} é um website de entretenimento online que oferece a
          seus usuários uma experiência única em Apostas Esportivas.
        </p>

        <p className="text-justify mt-3">
          {company.name} é operado pela empresa Bettergames Entertainment,
          entidade devidamente autorizada pelo Governo da Costa Rica, através da
          licença sob o nº 3-102-583797, com sede em Goicochea, Calle Branco,
          From Catolic Clinic, 25m West, Asesores Building, 2nd floor. As
          transações financeiras realizadas no website são processadas pela
          empresa Latam Entertainment Limited, entidade devidamente registrada
          em Malta sob o nº C 97352, com sede em 3, Gajera, Flat 3, Triq Gafar,
          Sliema, Malta.
        </p>

        <p className="text-justify mt-3">
          Ao acessar, continuar a utilizar ou navegar no website {company.name},
          você aceita que utilizemos certos de navegador com o objetivo de
          melhorar a sua experiência enquanto utiliza nosso site.
        </p>

        <p className="text-justify mt-3">
          {company.name} para melhorar a sua experiência e não interferem com
          sua privacidade.
        </p>
      </div>
    </div>
  )
}
