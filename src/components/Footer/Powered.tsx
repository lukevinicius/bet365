import rsaLogo from '@/assets/images/rsa-logo.png'
import { Image } from '@chakra-ui/react'

export function Powered() {
  return (
    <div>
      <div className="flex mt-10 justify-center items-center">
        <b>Powered by</b>
        <Image src={rsaLogo} alt="logo RSA" />
      </div>
      <p className="mt-10">
        COPYRIGHT © {new Date().getFullYear()} RSA | Todos os direitos
        reservados
      </p>
    </div>
  )
}
