import { IMatch } from '@/domain/interfaces/IMatch'
import { useBet } from '@/hooks/useBet'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
          <AccordionItem className="border-none">
            <AccordionButton p="0" pr="5">
              <div className="flex flex-1 items-center text-sm text-zinc-900 font-bold text-left py-3">
                <div className="px-3">
                  <RiCloseLine
                    onClick={() => handleRemoveAllMatches()}
                    cursor="pointer"
                    color="black"
                  />
                </div>

                {matches.length === 2 && <p>Dupla</p>}
                {matches.length === 3 && <p>Tripla</p>}
                {matches.length > 3 && <p>Multipla de {matches.length}</p>}

                {/* <Text fontWeight="bold" color="blue.900" fontSize="15px">
                    {Number(totalOdd) > 0 && `${totalOdd}`}
                  </Text> */}
              </div>
              <AccordionIcon color="blue.900" />
            </AccordionButton>
            <AccordionPanel
              p="0"
              className="p-0 max-h-72 overflow-auto bg-zinc-200"
            >
              {matches.map((match) => (
                <div
                  className="flex text-zinc-700 py-1 border-b-[1px] border-solid"
                  key={match.id}
                >
                  <div
                    className="mx-3"
                    onClick={() => handleRemoveMatch(match)}
                  >
                    <RiCloseLine cursor="pointer" />
                  </div>
                  <div>
                    {match.market.map((market) => (
                      <div key={market.id}>
                        <div className="flex space-x-2">
                          <p className="font-bold text-sm text-zinc-900">
                            {market.option}
                          </p>
                          <p className="font-bold text-sm text-blue-900">
                            {market.odd}
                          </p>
                        </div>
                        <p className="text-xs text-zinc-600">{market.name}</p>
                      </div>
                    ))}
                    <p className="text-xs text-zinc-600">
                      {match.localTeam} X {match.visitorTeam}
                    </p>
                  </div>
                </div>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </>
  )
}
