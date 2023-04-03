import { Stack } from '@chakra-ui/react'

import sport1 from '../../assets/images/sports/1.svg'
import sport2 from '../../assets/images/sports/2.svg'
import sport3 from '../../assets/images/sports/3.svg'
import sport6 from '../../assets/images/sports/6.svg'
import sport20 from '../../assets/images/sports/20.svg'
import sport40 from '../../assets/images/sports/40.svg'
import sport117 from '../../assets/images/sports/117.svg'
import eSports from '../../assets/images/sports/eSports.svg'

import { NavLink } from './NavLink'
import { NavSection } from './NavSection'

export function SidebarNav() {
  return (
    <Stack spacing="5" className="items-start w-full">
      <NavSection title="Lista completa">
        <NavLink src={sport1} href="/sports/1">
          Futebol
        </NavLink>
        <NavLink src={sport2} href="#">
          Basquete
        </NavLink>
        <NavLink src={sport3} href="#">
          Basebol
        </NavLink>
        <NavLink src={sport6} href="#">
          Handebol
        </NavLink>
        <NavLink src={sport20} href="#">
          Tênis de Mesa
        </NavLink>
        <NavLink src={sport40} href="#">
          Formula 1
        </NavLink>
        <NavLink src={sport117} href="#">
          MMA
        </NavLink>
        <NavLink src={sport117} href="#">
          Boxe
        </NavLink>
        <NavLink src={eSports} href="#">
          E-Sports
        </NavLink>
      </NavSection>
    </Stack>
  )
}