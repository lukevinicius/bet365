import { useAuth } from '@/hooks/useAuth'
import {
  Button,
  Icon,
  IconButton,
  Menu,
  useBreakpointValue,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useSidebarDrawer } from '@/containers/SidebarDrawerProvider'

import { Logo } from './Logo'
import { ModalSignIn } from './ModalSignIn'
import { Profile } from './Profile'
import { ActiveLink } from './ActiveLink'
import { RiMenuLine } from 'react-icons/ri'
import { translate } from '@/utils/translations'

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
        } lg:px-2`}
      >
        {!isWideVersion ? (
          <div className="flex flex-wrap w-full items-center">
            <div className="flex w-1/5 items-center justify-around">
              <IconButton
                icon={<Icon as={RiMenuLine} />}
                variant="unstyled"
                onClick={onOpen}
                m="0"
                fontSize={20}
                aria-label="Open navigation"
              />
              <FaSearch size={20} />
            </div>

            <div className="w-1/5 text-center">
              <ActiveLink className="w-1/5" href="/#">
                <p className="text-sm">{translate['pt-br'].inPlay}</p>
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
                    {translate['pt-br'].register}
                  </Button>
                </div>
                <div className="flex w-1/5 justify-center">
                  <Button
                    colorScheme="green"
                    size="sm"
                    onClick={() => setIsModalSignInOpen(true)}
                  >
                    {translate['pt-br'].login}
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
              <FaSearch size={20} />
              {/* Avatares para escolha de linguagem com foto do País */}
              <Menu>
                <MenuButton p="0">
                  <Image
                    alt="active-flag"
                    src="https://www.zbets.com.br/assets/plus2/ic-id-pt-br.svg"
                  />
                </MenuButton>
                <MenuList p="0">
                  <MenuItem className="space-x-2">
                    <Image
                      alt="pt-br"
                      src="https://www.zbets.com.br/assets/plus2/ic-id-pt-br.svg"
                    />
                    <span>Português</span>
                  </MenuItem>
                  <MenuItem className="space-x-2">
                    <Image
                      alt="en-us"
                      src="https://www.zbets.com.br/assets/plus2/ic-id-en.svg"
                    />
                    <span>English</span>
                  </MenuItem>
                  {/* <MenuItem className="space-x-2">
                    <Avatar
                      size="sm"
                      name="es-es"
                      src="https://www.flagsapi.com/ES/flat/64.png"
                    />
                    <span>Español</span>
                  </MenuItem> */}
                </MenuList>
              </Menu>
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
                    {translate['pt-br'].register}
                  </Button>
                  <Button
                    className="text-sm font-medium"
                    colorScheme="green"
                    size="sm"
                    onClick={() => setIsModalSignInOpen(true)}
                  >
                    {translate['pt-br'].login}
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
