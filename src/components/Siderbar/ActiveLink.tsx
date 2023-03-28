import { Link, LinkProps } from '@chakra-ui/react'
import { ReactElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
}

export function ActiveLink({ children, ...rest }: ActiveLinkProps) {
  // const pathname = usePathname()

  const isActive = false

  /* if (pathname === rest.href) {
    isActive = true
  } */

  return (
    <Link
      {...rest}
      className={`pl-5 py-3 hover:bg-[#383838] ${isActive && 'font-bold'}`}
    >
      {children}
    </Link>
  )
}
