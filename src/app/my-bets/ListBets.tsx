import { IBet } from '@/interface/Bet'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react'

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
                {bet.matches.length > 1 ? 'Multipla' : 'Simples'}
              </div>
              {bet.status !== 'pending' && (
                <div className="bg-[#5d5d5d] text-sm p-2 font-bold">
                  {bet.status === 'win'
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
              {bet.matches.map((match) => (
                <div key={match.staticId} className="px-4 mt-3">
                  <div className="flex justify-between">
                    <p className="font-bold">{match.market.option}</p>
                    <p>{match.market.odd}</p>
                  </div>

                  <p className="text-sm">{match.market.name}</p>
                  <p className="text-sm">
                    {match.localTeam} x {match.visitorTeam} - {match.date}
                  </p>
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
