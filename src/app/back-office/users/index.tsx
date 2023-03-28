import { useEffect, useState } from 'react'
import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { RiAddLine } from 'react-icons/ri'

import { useAuth } from '@/hooks/useAuth'
import { api } from '@/services/api/axios'
import { Link, redirect } from 'react-router-dom'
import { Pagination } from '@/components/Pagination'
import { UsersTable } from '@/components/Tables/Users'
import { useCompany } from '@/hooks/useCompany'

interface Users {
  id: string
  username: string
  email: string
  document: string
  status: string
}

export function UsersList() {
  const { user } = useAuth()
  const { company } = useCompany()
  const [users, setUsers] = useState<Users[]>([])
  const [page, setPage] = useState(1)
  const skip = (page - 1) * 10
  const take = page * 10

  useEffect(() => {
    async function getUsers() {
      const { data } = await api.get('/users/by-role', {
        params: {
          companyId: company.id,
          role: 'ADMIN',
          skip,
          take,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      setUsers(data)
    }

    getUsers()
  }, [company.id, skip, take, user.token])

  useEffect(() => {
    if (user.role !== 'ADMIN' && !user.token) {
      redirect('/')
    }
  })

  return (
    <Flex w="100%" py="6" bg="gray.900" maxWidth={1480} mx="auto" px="6">
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Usuários
          </Heading>

          <Flex>
            <Link to="/back-office/Users/create">
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                ml="4"
                leftIcon={<Icon as={RiAddLine} fontSize={20} />}
                cursor="pointer"
              >
                Criar novo usuário
              </Button>
            </Link>
          </Flex>
        </Flex>

        {users.length > 0 ? (
          <>
            <UsersTable users={users} />

            <Pagination
              registersPerPage={10}
              onPageChange={setPage}
              totalCountOfRegisters={users.length}
              currentPage={page}
            />
          </>
        ) : (
          <Flex justify="center">
            <Text>Nenhum usuário pra ser listado.</Text>
          </Flex>
        )}
      </Box>
    </Flex>
  )
}
