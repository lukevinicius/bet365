import { useAuth } from '@/hooks/useAuth'
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Text,
  Button,
  Spacer,
  Icon,
  SimpleGrid,
  keyframes,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { MdOutlineWatchLater } from 'react-icons/md'
import {
  RiDownloadLine,
  RiRestartLine,
  RiUserSettingsLine,
  RiWallet3Line,
} from 'react-icons/ri'
import { useState } from 'react'

interface IBody {
  username: string
  type: string
  wallet: {
    balance: number
    courtesy: number
  }
  isOpen: boolean
  onClose: () => void
}

export function DrawerProfile({
  username,
  wallet,
  type,
  isOpen,
  onClose,
}: IBody) {
  const { signOut, findBalance } = useAuth()
  const [isFetching, setIsFetching] = useState(false)

  const spin = keyframes`
  from { 
    transform: rotate(0deg); 
  }
  to { 
    transform: rotate(360deg); 
  }
`

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody className="bg-[#5a5a5a] py-5 px-0" color="whiteAlpha.900">
            <div className="flex p-5">
              <div>
                <p className="font-[0.9rem]">{username}</p>
                <div className="flex items-center">
                  <Icon
                    cursor="pointer"
                    as={RiRestartLine}
                    fontSize="0.85rem"
                    onClick={async () => {
                      setIsFetching(true)
                      await findBalance().finally(() => setIsFetching(false))
                    }}
                    animation={isFetching ? `${spin} 1s infinite linear` : ''}
                  />
                  <p className="font-bold ml-2">
                    {wallet.balance.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                </div>
              </div>
              <Spacer />
              <Button
                as={Link}
                to="/me/bank/deposit"
                size="sm"
                variant="outline"
                leftIcon={<RiDownloadLine />}
                onClick={() => onClose()}
              >
                Depositar
              </Button>
            </div>
            <div className="flex space-x-10 mb-5 px-5">
              <div>
                <p className="font-[0.8rem]">Disponivel</p>
                <p className="font-bold">
                  {wallet.balance.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
              </div>
              <div>
                <p className="font-[0.8rem]">Saldo de Bônus</p>
                <p className="font-bold">
                  {wallet.courtesy.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
              </div>
            </div>
            <Divider color="gray.200" size="1" />
            <SimpleGrid
              columns={3}
              className="text-center p-5 justify-center items-center"
              spacing="10"
            >
              <Link
                to="/me/bank"
                className="outline-none whitespace-nowrap"
                onClick={() => onClose()}
              >
                <Icon as={RiWallet3Line} fontSize={24} />
                <p className="font-bold">Banco</p>
              </Link>
              <Link
                to="/me/account"
                className="outline-none whitespace-nowrap"
                onClick={() => onClose()}
              >
                <Icon as={RiUserSettingsLine} fontSize={24} />
                <p className="font-bold">Conta</p>
              </Link>
              <Link
                to="/me"
                className="outline-none whitespace-nowrap"
                onClick={() => onClose()}
              >
                <Icon as={MdOutlineWatchLater} fontSize={24} />
                <p className="font-bold">Histórico</p>
              </Link>
              {type === 'affiliate' && (
                <Link to="/me">
                  <Icon as={MdOutlineWatchLater} fontSize={24} />
                  <p className="font-bold">Afiliados</p>
                </Link>
              )}
            </SimpleGrid>
            <Divider color="gray.200" size="1" />
            <div className="flex flex-col space-y-5 p-5">
              <p>Jogo Responsável</p>
              <p>Ajuda</p>
            </div>
            <Divider color="gray.200" h="5px" />
            <Text p="5" cursor="pointer" onClick={() => signOut()}>
              Sair
            </Text>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
