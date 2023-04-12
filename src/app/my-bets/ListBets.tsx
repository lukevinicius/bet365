import { IBet } from '@/interface/Bet'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react'
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxCircleFill,
  RiCloseCircleFill,
} from 'react-icons/ri'

type Props = {
  bets: IBet[]
}

export function ListBets({ bets }: Props) {
  return (
    <Accordion defaultIndex={[0]} allowToggle>
      {bets &&
        bets.map((bet) => (
          <AccordionItem key={bet.id}>
            <AccordionButton
              _hover={{
                bg: '#505050',
              }}
            >
              <div className="flex-1 text-left text-sm p-2 font-bold">
                {bet.stake.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}{' '}
                {bet.bets.length > 1 ? 'Multipla' : 'Simples'}
              </div>
              {bet.status !== 'pending' && (
                <div className="bg-[#5d5d5d] text-sm p-2 font-bold">
                  {bet.status === 'won' || bet.status === 'paid'
                    ? `Ganhou R$ ${bet.jackpot.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}`
                    : 'Perdida'}
                </div>
              )}
            </AccordionButton>
            <AccordionPanel px={0} pb={4}>
              <hr className="border-[#5d5d5d]" />
              {bet.bets.map((match) => (
                <div key={match.id} className="flex px-4 mt-3">
                  {match.status === 'won' ? (
                    <RiCheckboxCircleFill
                      className="text-green-400 mt-1 mr-1"
                      size={14}
                    />
                  ) : match.status === 'lost' ? (
                    <RiCloseCircleFill
                      className="text-red-400 mt-1 mr-1"
                      size={14}
                    />
                  ) : (
                    <RiCheckboxBlankCircleFill
                      className="text-gray-500 mt-1 mr-1"
                      size={14}
                    />
                  )}
                  <div className="flex-1">
                    {match.market.map((market) => (
                      <>
                        <div className="flex justify-between">
                          <p className="font-bold">{market.option}</p>
                          <p>{Number(market.odd).toFixed(2)}</p>
                        </div>
                        <p className="text-sm">{market.name}</p>
                      </>
                    ))}

                    <p className="text-sm">
                      {match.localTeam} x {match.visitorTeam} -{' '}
                      {new Date(match.date).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour12: false,
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <hr className="border-[#5d5d5d] my-3" />
              <div className="flex text-left px-4">
                <div className="w-1/2">
                  <p className="text-sm">Aposta</p>
                  <p>
                    {bet.stake.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm">Retorno</p>
                  <p>
                    {bet.jackpot.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                </div>
              </div>
            </AccordionPanel>
          </AccordionItem>
        ))}
    </Accordion>
  )
}
