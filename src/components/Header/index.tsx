import { useAuth } from '@/hooks/useAuth'
import { Button, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useSidebarDrawer } from '@/containers/SidebarDrawerProvider'

import { Logo } from './Logo'
import { ModalSignIn } from './ModalSignIn'
import { Profile } from './Profile'
import { ActiveLink } from './ActiveLink'
import { RiMenuLine } from 'react-icons/ri'

export function Header() {
  const { user } = useAuth()
  const [isModalSignInOpen, setIsModalSignInOpen] = useState(false)
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue<boolean>({
    base: false,
    lg: true,
  })

  return (
    <>
      <ModalSignIn
        isOpen={isModalSignInOpen}
        onClose={() => setIsModalSignInOpen(false)}
      />
      <header
        className={`flex w-full mx-auto justify-center bg-blue-900 h-16 laptop:h-20 laptop:px-2`}
      >
        {!isWideVersion ? (
          <div className="flex flex-wrap w-full items-center">
            <div className="flex items-center justify-around">
              <IconButton
                icon={<Icon as={RiMenuLine} />}
                variant="unstyled"
                onClick={onOpen}
                m="0"
                fontSize={24}
                aria-label="Open navigation"
              />
              <p className="text-center">Ao Vivo</p>
            </div>

            <div className="flex-1 justify-center text-center">
              <Logo />
            </div>
            <div className={`flex items-center md:ml-auto`}>
              {user.token ? (
                <Profile />
              ) : (
                <div className="flex space-x-3 text-center whitespace-nowrap mx-2">
                  <Button colorScheme="orange" as={Link} to="/sign-up">
                    Registra-se
                  </Button>
                  <Button
                    colorScheme="green"
                    onClick={() => setIsModalSignInOpen(true)}
                  >
                    Login
                  </Button>
                </div>
              )}
              {/* <NotificationsNav /> */}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap h-full items-center w-full">
            <div className="flex-1  justify-start">
              <Logo />
            </div>
            <nav className="space-x-5">
              {/* <ActiveLink href="#">
                <p>Esportes</p>
              </ActiveLink>
              <ActiveLink href="#">
                <p>Ao Vivo</p>
              </ActiveLink> */}
              <ActiveLink href="/casino">
                <p>Cassino</p>
              </ActiveLink>
              {/* <ActiveLink href="#">
                <p>E-Sports</p>
              </ActiveLink>
              <ActiveLink href="#">
                <p>Aviator</p>
              </ActiveLink> */}
            </nav>

            <div className="flex space-x-3 flex-1 justify-end items-center">
              <FaSearch size={24} />
              {user.token ? (
                <Profile />
              ) : (
                <div className="flex space-x-2 justify-end">
                  <Button as={Link} to="/sign-up" colorScheme="orange">
                    Registra-se
                  </Button>
                  <Button
                    className="text-sm font-medium"
                    colorScheme="green"
                    onClick={() => setIsModalSignInOpen(true)}
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
