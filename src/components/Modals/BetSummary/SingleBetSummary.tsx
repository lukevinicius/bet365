import { IMatch } from '@/domain/interfaces/IMatch'
import { useBet } from '@/hooks/useBet'
import { Flex, HStack, Text } from '@chakra-ui/react'
import { RiCloseLine } from 'react-icons/ri'

export function SingleBetSummary(match: IMatch) {
  const { handleRemoveMatch } = useBet()

  return (
    <>
      <Flex py="3" color="gray.800">
        <div className="px-5" onClick={() => handleRemoveMatch(match)}>
          <RiCloseLine cursor="pointer" />
        </div>
        <div>
          {match.market.map((market) => (
            <div key={market.id}>
              <HStack>
                <Text fontWeight="bold" color="gray.900" fontSize="15px">
                  {market.option}
                </Text>
                <Text fontWeight="bold" color="blue.900" fontSize="15px">
                  {market.odd}
                </Text>
              </HStack>
              <Text fontSize="11px">{market.name}</Text>
            </div>
          ))}
          <Text fontSize="11px">
            {match.localTeam} X {match.visitorTeam}
          </Text>
        </div>
      </Flex>
    </>
  )
}
