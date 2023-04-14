import { Stack } from '@chakra-ui/react'

import { NavLink } from './NavLink'
import { NavSection } from '../NavSection'
import { RiDownload2Fill } from 'react-icons/ri'

export function SidebarNav() {
  return (
    <Stack spacing="5" className="items-start w-full">
      <NavSection title="Lista completa">
        {/* <NavLink icon={sport1} href="#">
          Futebol
        </NavLink>
        <NavLink icon={sport2} href="#">
          Basquete
        </NavLink>
        <NavLink icon={sport3} href="#">
          Basebol
        </NavLink>
        <NavLink icon={sport6} href="#">
          Handebol
        </NavLink>
        <NavLink icon={sport20} href="#">
          Tênis de Mesa
        </NavLink>
        <NavLink icon={sport40} href="#">
          Formula 1
        </NavLink>
        <NavLink icon={sport117} href="#">
          MMA
        </NavLink>
        <NavLink icon={sport117} href="#">
          Boxe
        </NavLink> */}
        <NavLink icon={RiDownload2Fill} href="/back-office/leagues-management">
          Gerenciamento de Ligas
        </NavLink>
        <NavLink
          icon={RiDownload2Fill}
          href="/back-office/bank-settings/advertising"
        >
          Publicidade
        </NavLink>
        <NavLink icon={RiDownload2Fill} href="/back-office/players">
          Jogadores
        </NavLink>
        <NavLink icon={RiDownload2Fill} href="#">
          Exportação
        </NavLink>
      </NavSection>
    </Stack>
  )
}
