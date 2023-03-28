import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { UserItem } from './UserItem'

interface User {
  id: string
  username: string
  email: string
  document: string
  status: string
}

interface UsersTableProps {
  users: User[]
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <>
      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th>Usuário</Th>
            <Th>E-mail</Th>
            <Th>Documento</Th>
            <Th>Status</Th>
            <Th>Editar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((item) => (
            <UserItem key={item.id} user={item} />
          ))}
        </Tbody>
      </Table>
    </>
  )
}
