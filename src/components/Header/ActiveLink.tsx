import { ReactElement } from 'react'
import { Link, LinkProps } from '@chakra-ui/react'
import { Link as DomLink } from 'react-router-dom'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
}

export function ActiveLink({ children, ...rest }: ActiveLinkProps) {
  const pathname = window.location.pathname

  let isActive = false

  if (pathname === rest.href) {
    isActive = true
  }

  const classNameActive = isActive
    ? 'font-bold text-white border-b-2 border-orange-600 inline-block'
    : 'text-gray-300 inline-block'

  return (
    <Link as={DomLink} to={rest.href} {...rest} className={classNameActive}>
      {children}
    </Link>
  )
}
