import { IMatch } from '@/domain/interfaces/IMatch'
import { useBet } from '@/hooks/useBet'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  Text,
} from '@chakra-ui/react'
import { RiCloseLine } from 'react-icons/ri'

interface MultiBetSummaryProps {
  matches: IMatch[]
}

export function MultiBetSummary({ matches }: MultiBetSummaryProps) {
  const { handleRemoveMatch, handleRemoveAllMatches } = useBet()

  return (
    <>
      {matches.length > 1 && (
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton p="0" pr="5">
                <Box
                  display="flex"
                  py="4"
                  flex="1"
                  textAlign="left"
                  fontWeight="bold"
                  color="gray.900"
                  fontSize="15px"
                >
                  <Box mx="5">
                    <RiCloseLine
                      onClick={() => handleRemoveAllMatches()}
                      cursor="pointer"
                    />
                  </Box>

                  {matches.length === 2 && <Text mr="2">Dupla</Text>}
                  {matches.length === 3 && <Text mr="2">Tripla</Text>}
                  {matches.length > 3 && (
                    <Text mr="2">Multipla de {matches.length}</Text>
                  )}

                  {/* <Text fontWeight="bold" color="blue.900" fontSize="15px">
                    {Number(totalOdd) > 0 && `${totalOdd}`}
                  </Text> */}
                </Box>
                <AccordionIcon color="blue.900" />
              </AccordionButton>
            </h2>
            <AccordionPanel p="0" maxH="300px" overflow="auto" bg="gray.200">
              {matches.map((tipInfo) => (
                <Flex
                  color="gray.800"
                  key={tipInfo.id}
                  py="1"
                  borderBottom="1px solid gray"
                >
                  <Box mx="5" onClick={() => handleRemoveMatch(tipInfo)}>
                    <RiCloseLine cursor="pointer" />
                  </Box>
                  <div>
                    {tipInfo.market.map((market) => (
                      <div key={market.id}>
                        <HStack>
                          <Text
                            fontWeight="bold"
                            color="gray.900"
                            fontSize="15px"
                          >
                            {market.option}
                          </Text>
                          <Text
                            fontWeight="bold"
                            color="blue.900"
                            fontSize="15px"
                          >
                            {market.odd}
                          </Text>
                        </HStack>
                        <Text fontSize="11px">{market.name}</Text>
                      </div>
                    ))}
                    <Text fontSize="11px">
                      {tipInfo.localTeam} X {tipInfo.visitorTeam}
                    </Text>
                  </div>
                </Flex>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </>
  )
}
