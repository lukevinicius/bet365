import { Button, Icon, Td, Tr, useBreakpointValue } from '@chakra-ui/react'
import { RiPencilLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

interface User {
  id: string
  username: string
  email: string
  document: string
  status: string
}

interface UserItemProps {
  user: User
}

export function UserItem({ user }: UserItemProps) {
  const isWideVersion = useBreakpointValue<boolean>({
    base: false,
    lg: true,
  })

  return (
    <Tr>
      <Td>
        <p className="text-white text-sm">{user.username}</p>
      </Td>
      <Td>
        <p className="text-white text-sm">{user.email}</p>
      </Td>
      <Td>
        <p className="text-white text-sm">{user.document}</p>
      </Td>
      <Td>
        <p className="text-white text-sm">{user.status}</p>
      </Td>
      <Td>
        {isWideVersion && (
          <Link to={`/back-office/users/update/${user.id}`}>
            <Button
              as="a"
              size="sm"
              text-sm="sm"
              colorScheme="purple"
              leftIcon={<Icon as={RiPencilLine} fontSize={16} />}
              cursor="pointer"
              w="140px"
            >
              Editar Usuário
            </Button>
          </Link>
        )}
      </Td>
    </Tr>
  )
}
