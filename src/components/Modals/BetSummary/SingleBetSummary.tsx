import { IMatch } from '@/domain/interfaces/IMatch'
import { useBet } from '@/hooks/useBet'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { RiCloseLine } from 'react-icons/ri'

export function SingleBetSummary(match: IMatch) {
  const { handleRemoveMatch } = useBet()

  return (
    <>
      <Flex py="3" color="gray.800">
        <Box px="5" onClick={() => handleRemoveMatch(match)}>
          <RiCloseLine cursor="pointer" />
        </Box>
        <Box>
          <HStack>
            <Text fontWeight="bold" color="gray.900" fontSize="15px">
              {match.market.option}
            </Text>
            <Text fontWeight="bold" color="blue.900" fontSize="15px">
              {match.market.odd}
            </Text>
          </HStack>
          <Text fontSize="11px">{match.market.name}</Text>
          <Text fontSize="11px">
            {match.localTeam} X {match.visitorTeam}
          </Text>
        </Box>
      </Flex>
    </>
  )
}
