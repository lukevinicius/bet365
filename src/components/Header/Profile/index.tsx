import { useState } from 'react'
import {
  Avatar,
  Button,
  Link,
  useBreakpointValue,
  Icon,
  keyframes,
} from '@chakra-ui/react'
import { RiRestartLine } from 'react-icons/ri'
import { useAuth } from '@/hooks/useAuth'
import { DrawerProfile } from './DrawerProfile'

export function Profile() {
  const { user, findBalance } = useAuth()
  const [openModal, setOpenModal] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const spin = keyframes`
  from { 
    transform: rotate(0deg); 
  }
  to { 
    transform: rotate(360deg); 
  }
`

  const isWideVersion = useBreakpointValue<boolean>({
    base: false,
    lg: true,
  })

  return (
    <div className="items-end">
      {isWideVersion ? (
        <div className="flex">
          <div className="mr-2 text-right">
            <div className="flex items-center">
              <Icon
                cursor="pointer"
                as={RiRestartLine}
                fontSize="0.75rem"
                onClick={async () => {
                  setIsFetching(true)
                  await findBalance().finally(() => setIsFetching(false))
                }}
                animation={isFetching ? `${spin} 1s infinite linear` : ''}
              />
              <p className="ml-2 text-xs">
                {user.wallet.balance.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
            </div>
            <Link href="/me/bank/deposit">
              <p className="text-xs font-bold cursor-pointer text-gray-100 hover:text-gray-300">
                Depositar
              </p>
            </Link>
          </div>
          <Button
            _focus={{ outline: 'none' }}
            variant="link"
            onClick={() => setOpenModal(true)}
          >
            <Avatar size="sm" name={user.name} />
          </Button>
        </div>
      ) : (
        <div className="text-center mr-2">
          <Button
            _focus={{ outline: 'none' }}
            variant="link"
            onClick={() => setOpenModal(true)}
          >
            <Avatar size="xs" name={user.name} />
          </Button>
          <p className="whitespace-nowrap text-xs flex-nowrap">
            {user.wallet.balance.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </div>
      )}

      <DrawerProfile
        username={user.username}
        wallet={user.wallet}
        isOpen={openModal}
        type={user.role}
        onClose={() => setOpenModal(false)}
      />
    </div>
  )
}
