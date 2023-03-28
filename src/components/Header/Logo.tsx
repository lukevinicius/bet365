import { useCompany } from '@/hooks/useCompany'
import { Image, Link } from '@chakra-ui/react'
import { Link as DomLink } from 'react-router-dom'

export function Logo() {
  const { company } = useCompany()

  return (
    <Link
      as={DomLink}
      to="/"
      textDecoration="none"
      fontSize={['2xl', '3xl']}
      fontWeight="bold"
      letterSpacing="tight"
    >
      <Image src={company.logo} alt="logo-company" className="h-14" />
    </Link>
  )
}
