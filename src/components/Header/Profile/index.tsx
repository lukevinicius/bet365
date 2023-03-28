import { useState } from 'react'
import {
  Avatar,
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Link,
  useBreakpointValue,
  Icon,
} from '@chakra-ui/react'
import { RiRestartLine } from 'react-icons/ri'
import { useAuth } from '@/hooks/useAuth'
import { DrawerProfile } from './DrawerProfile'

export function Profile() {
  const { user, findBalance } = useAuth()
  const [openModal, setOpenModal] = useState(false)

  const isWideVersion = useBreakpointValue<boolean>({
    base: false,
    lg: true,
  })

  return (
    <Flex align="center">
      {isWideVersion ? (
        <>
          <Box mr="2" textAlign="right">
            <Box display="flex" alignItems="center">
              <Icon
                cursor="pointer"
                as={RiRestartLine}
                fontSize="0.85rem"
                onClick={() => findBalance()}
              />
              <Text fontSize="0.85rem" ml="2">
                R$ {user.wallet.balance.toFixed(2)}
              </Text>
            </Box>
            <Link href="/me/bank/deposit">
              <p className="text-[0.7rem] font-bold cursor-pointer text-gray-100 hover:text-gray-300">
                Depositar
              </p>
            </Link>
          </Box>
          <Button
            _focus={{ outline: 'none' }}
            variant="link"
            onClick={() => setOpenModal(true)}
          >
            <Avatar size="md" name={user.name} />
          </Button>
        </>
      ) : (
        <Stack className="text-center mr-2" spacing={0}>
          <Button
            _focus={{ outline: 'none' }}
            variant="link"
            onClick={() => setOpenModal(true)}
          >
            <Avatar size="sm" name={user.name} />
          </Button>
          <Text className="whitespace-nowrap font-[0.7rem]" whiteSpace="nowrap">
            R$ {user.wallet.balance.toFixed(2)}
          </Text>
        </Stack>
      )}

      <DrawerProfile
        username={user.username}
        wallet={user.wallet}
        isOpen={openModal}
        type={user.role}
        onClose={() => setOpenModal(false)}
      />
    </Flex>
  )
}
