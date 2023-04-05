import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useBet } from '@/hooks/useBet'
import { useAuth } from '@/hooks/useAuth'
import { useCompany } from '@/hooks/useCompany'

import { Input } from '@/components/Form/Input'
import { api } from '@/services/api/axios'
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { MultiBetSummary } from './MultiBetSummary'
import { SingleBetSummary } from './SingleBetSummary'

interface CreateTicketFormData {
  stake: number
}

const createTicketSchema = z.object({
  stake: z.string(),
})

export function BetSummary() {
  const { user } = useAuth()
  const { company } = useCompany()
  const { selectedMatch, handleRemoveAllMatches } = useBet()

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  })

  const jackpot = selectedMatch.reduce((acc, match) => {
    return acc * Number(match.market.odd)
  }, 0)

  const { register, handleSubmit, formState } = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
  })

  const handleCreateTicket: SubmitHandler<CreateTicketFormData> = async (
    data,
  ) => {
    await api
      .post('/ticket', {
        companyId: company.id,
        userId: user.id,
        stake: data.stake,
        matches: selectedMatch,
      })
      .then(handleRemoveAllMatches)
  }

  return (
    <Flex
      pointerEvents="none"
      pos="fixed"
      bottom={isWideVersion ? '0px' : '70px'}
      zIndex="5"
      justifyContent="center"
      alignItems="flex-end"
      w="100%"
    >
      <Stack
        maxW="450px"
        zIndex="10"
        flex="1"
        spacing="0"
        pos="relative"
        pointerEvents="auto"
        display="block"
      >
        {/* Top of the modal */}
        <Flex bgColor="gray.100" borderRadius="5px 5px 0 0" flexDir="column">
          {selectedMatch.length === 1 && (
            <SingleBetSummary
              staticId={selectedMatch[0].staticId}
              localTeam={selectedMatch[0].localTeam}
              visitorTeam={selectedMatch[0].visitorTeam}
              market={selectedMatch[0].market}
              date={selectedMatch[0].date}
              time={selectedMatch[0].time}
            />
          )}
          {selectedMatch.length > 1 && (
            <MultiBetSummary matches={selectedMatch} />
          )}
        </Flex>

        {/* Bottom of the modal */}
        <form
          onSubmit={handleSubmit(handleCreateTicket)}
          className="flex w-full"
        >
          <div className="w-1/2">
            <Input
              bg="gray.100"
              color="gray.900"
              _hover={{
                bgColor: 'gray.100',
              }}
              _focus={{
                bgColor: 'gray.100',
                outline: 'none',
                color: 'gray.900',
              }}
              borderRadius="0 0 0 5px"
              placeholder="Valor da Aposta"
              colorScheme="white"
              {...register('stake')}
              /* onChange={(e) => handleStakeChange(e.target.value)} */
            />
          </div>
          <Button
            w="225px"
            size="lg"
            borderRadius="0 0 5px 0"
            colorScheme="green"
            type="submit"
            isLoading={formState.isSubmitting}
          >
            <Box>
              <Text>Fazer Aposta</Text>
              <Text fontWeight="normal" fontSize="11px">
                {Number(jackpot) > 0 && `Retorno R$ ${jackpot}`}
              </Text>
            </Box>
          </Button>
        </form>
      </Stack>
    </Flex>
  )
}
