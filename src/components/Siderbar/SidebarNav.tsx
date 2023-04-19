import { Stack } from '@chakra-ui/react'

import sport1 from '../../assets/images/sports/1.svg'
import sport2 from '../../assets/images/sports/2.svg'
import sport3 from '../../assets/images/sports/3.svg'
import sport5 from '@/assets/images/sports/5.svg'
import sport6 from '../../assets/images/sports/6.svg'
import sport20 from '../../assets/images/sports/20.svg'
import sport23 from '../../assets/images/sports/23.svg'
// import sport40 from '../../assets/images/sports/40.svg'
import sport117 from '../../assets/images/sports/117.svg'
// import eSports from '../../assets/images/sports/eSports.svg'

import { NavLink } from './NavLink'
import { NavSection } from './NavSection'

export function SidebarNav() {
  return (
    <Stack spacing="5" className="items-start w-full">
      <NavSection title="Lista completa">
        <NavLink src={sport1} href={`/sports/${'soccer'}`}>
          Futebol
        </NavLink>
        <NavLink src={sport2} href={`/sports/${'basketball'}`}>
          Basquete
        </NavLink>
        <NavLink src={sport3} href={`/sports/${'baseball'}`}>
          Basebol
        </NavLink>
        <NavLink src={sport5} href={`/sports/${'tennis'}`}>
          Tênis
        </NavLink>
        <NavLink src={sport6} href={`/sports/${'handball'}`}>
          Handebol
        </NavLink>
        <NavLink src={sport20} href={`/sports/${'table-tennis'}`}>
          Tênis de Mesa
        </NavLink>
        {/* <NavLink src={sport40} href="#">
          Formula 1
        </NavLink> */}
        <NavLink src={sport117} href={`/sports/${'mma'}`}>
          MMA
        </NavLink>
        {/* <NavLink src={eSports} href="#">
          E-Sports
        </NavLink> */}
        <NavLink src={sport23} href={`/sports/${'volleyball'}`}>
          Voleibol
        </NavLink>
        {/* <NavLink src={eSports} href="#">
          Futsal
        </NavLink> */}
      </NavSection>
    </Stack>
  )
}
