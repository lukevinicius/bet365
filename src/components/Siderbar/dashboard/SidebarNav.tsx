import { Stack } from '@chakra-ui/react'

import { NavLink } from './NavLink'
import { NavSection } from '../NavSection'
import { RiDownload2Fill } from 'react-icons/ri'

export function SidebarNav() {
  return (
    <Stack spacing="5" className="items-start w-full">
      <NavSection title="Lista completa">
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
