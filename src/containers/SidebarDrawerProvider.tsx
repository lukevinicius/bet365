import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'
import { createContext, ReactNode, useContext, useEffect } from 'react'

type SidebarDrawerProviderProps = {
  children: ReactNode
}

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData)

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure()
  const pathnames = window.location.pathname

  const pathname = pathnames || ''

  useEffect(() => {
    disclosure.onClose()
    // eslint-disable-next-line
  }, [pathname])

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)
