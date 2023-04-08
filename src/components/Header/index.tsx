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
        className={`flex w-full mx-auto justify-center bg-blue-900 ${
          isWideVersion ? 'h-[70px]' : 'h-[50px]'
        } laptop:px-2`}
      >
        {!isWideVersion ? (
          <div className="flex flex-wrap w-full items-center">
            <div className="flex w-1/5 items-center justify-around">
              <IconButton
                icon={<Icon as={RiMenuLine} />}
                variant="unstyled"
                onClick={onOpen}
                m="0"
                fontSize={24}
                aria-label="Open navigation"
              />
            </div>

            <div className="w-1/5 text-center">
              <ActiveLink className="w-1/5" href="/#">
                <p className="text-sm">Ao Vivo</p>
              </ActiveLink>
            </div>

            <div className="flex w-1/5 justify-center text-center">
              <Logo />
            </div>
            {user.token ? (
              <>
                <div className="w-1/5 text-center">
                  <ActiveLink className="w-1/5" href="/mb">
                    <p className="text-sm">Minhas Apostas</p>
                  </ActiveLink>
                </div>
                <div className="flex w-1/5 justify-center items-end">
                  <Profile />
                </div>
              </>
            ) : (
              <>
                <div className="flex w-1/5 justify-center">
                  <Button
                    variant={isWideVersion ? 'solid' : ''}
                    colorScheme="orange"
                    size="sm"
                    as={Link}
                    to="/sign-up"
                  >
                    Registrar
                  </Button>
                </div>
                <div className="flex w-1/5 justify-center">
                  <Button
                    colorScheme="green"
                    size="sm"
                    onClick={() => setIsModalSignInOpen(true)}
                  >
                    Login
                  </Button>
                </div>
              </>
            )}
            {/* <NotificationsNav /> */}
          </div>
        ) : (
          <div className="flex flex-wrap h-full items-center w-full">
            <div className="flex-1 justify-start">
              <Logo />
            </div>
            <nav className="space-x-5">
              {/* <ActiveLink href="#">
                <p>Esportes</p>
              </ActiveLink>
              <ActiveLink href="#">
                <p>Ao Vivo</p>
              </ActiveLink> */}
              {/* <ActiveLink href="/casino">
                <p>Cassino</p>
              </ActiveLink> */}
              {user.token && (
                <ActiveLink href="/mb">
                  <p className="text-sm">Minhas Apostas</p>
                </ActiveLink>
              )}
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
                  <Button
                    as={Link}
                    to="/sign-up"
                    size="sm"
                    colorScheme="orange"
                  >
                    Registra-se
                  </Button>
                  <Button
                    className="text-sm font-medium"
                    colorScheme="green"
                    size="sm"
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
