import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useBreakpointValue,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react'

import { SidebarNav } from './SidebarNav'

import { useSidebarDrawer } from '@/containers/SidebarDrawerProvider'

export function DashboardSidebar() {
  const { isOpen, onClose } = useSidebarDrawer()

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent className="bg-[#181b23] p-2 text-white">
            <DrawerCloseButton className="mt-6 focus:outline-none" />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody className="py-5 px-0" onClick={() => onClose()}>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <div className="position-sticky z-10 overflow-auto w-[300px] overscroll-auto h-[calc(100vh - 70px)] bg-[#181b23]">
      <aside className="py-5 shadow-[0 0 20px rgba(0, 0, 0, 0.05)] rounded-[4rem] direction-column">
        <SidebarNav />
      </aside>
    </div>
  )
}
