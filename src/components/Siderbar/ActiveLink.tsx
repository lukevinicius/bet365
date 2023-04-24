import { Link, LinkProps } from '@chakra-ui/react'
import { ReactElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
}

export function ActiveLink({ children, ...rest }: ActiveLinkProps) {
  const pathname = window.location.pathname

  let isActive = false

  if (pathname === rest.href) {
    isActive = true
  }

  return (
    <Link
      {...rest}
      textDecoration="none"
      className={`pl-5 py-3 hover:bg-gray.800 hover:no-underline ${
        isActive && 'font-bold'
      }`}
    >
      {children}
    </Link>
  )
}
