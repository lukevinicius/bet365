import { Image } from '@chakra-ui/react'
import { ActiveLink } from './ActiveLink'

type NavLinkProps = {
  src: string
  href: string
  children: string
}

export function NavLink({ src, href, children }: NavLinkProps) {
  return (
    <ActiveLink href={href}>
      <div className="flex items-center">
        <Image src={src} className="h-6 w-6" alt="sportIcon" />
        <p className="ml-3">{children}</p>
      </div>
    </ActiveLink>
  )
}
