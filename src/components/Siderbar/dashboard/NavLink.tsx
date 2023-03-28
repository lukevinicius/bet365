import { Icon } from '@chakra-ui/react'
import { ElementType } from 'react'
import { ActiveLink } from '../ActiveLink'

type NavLinkProps = {
  icon: ElementType
  href: string
  children: string
}

export function NavLink({ icon, href, children, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href}>
      <div className="flex items-center">
        <Icon as={icon} fontSize="20" />
        <p className="ml-3">{children}</p>
      </div>
    </ActiveLink>
  )
}
