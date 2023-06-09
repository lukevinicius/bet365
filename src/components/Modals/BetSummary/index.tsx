import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useBet } from '@/hooks/useBet'
import { useAuth } from '@/hooks/useAuth'
import { useCompany } from '@/hooks/useCompany'

import { api } from '@/services/api/axios'
import { Spinner, useBreakpointValue, useToast } from '@chakra-ui/react'
import { MultiBetSummary } from './MultiBetSummary'
import { SingleBetSummary } from './SingleBetSummary'
import { useState } from 'react'
import { ModalSignIn } from '@/components/Header/ModalSignIn'

const createTicketSchema = z.object({
  stake: z
    .string()
    .min(1, 'Valor mínimo de R$ 1,00')
    .transform((value) => Number(value)),
})

type CreateTicketFormData = z.infer<typeof createTicketSchema>

export function BetSummary() {
  const toast = useToast()
  const { user, updateWallet } = useAuth()
  const { company } = useCompany()
  const { selectedMatch, handleRemoveAllMatches } = useBet()
  const [isModalSignInOpen, setIsModalSignInOpen] = useState(false)

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  })

  /* const jackpot = selectedMatch.reduce((acc, match) => {
    return acc + match.market.odds
  }, 0) */

  const createTicketForm = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = createTicketForm

  const handleCreateTicket: SubmitHandler<CreateTicketFormData> = async (
    data,
  ) => {
    if (!user.id) {
      setIsModalSignInOpen(true)
    } else {
      await api
        .post('/ticket', {
          companyId: company.id,
          userId: user.id,
          stake: data.stake,
          matches: selectedMatch,
        })
        .then((response) => {
          if (response.status === 200) {
            handleRemoveAllMatches()
            updateWallet(response.data)
            toast({
              position: 'top',
              title: 'Aposta realizada com sucesso!',
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
          }
        })
    }
  }

  return (
    <>
      <ModalSignIn
        isOpen={isModalSignInOpen}
        onClose={() => setIsModalSignInOpen(false)}
      />
      <div
        className={`pointer-events-none flex w-full fixed ${
          isWideVersion ? 'bottom-0' : 'bottom-16'
        } z-10 justify-center items-end`}
      >
        <div className="w-full max-w-md z-10 relative pointer-events-auto">
          {/* Top of the modal */}
          <div className="flex flex-col bg-zinc-300 rounded-t-md">
            {selectedMatch.length === 1 && (
              <SingleBetSummary
                id={selectedMatch[0].id}
                leagueId={selectedMatch[0].leagueId}
                localTeam={selectedMatch[0].localTeam}
                visitorTeam={selectedMatch[0].visitorTeam}
                market={selectedMatch[0].market}
                date={selectedMatch[0].date}
              />
            )}
            {selectedMatch.length > 1 && (
              <MultiBetSummary matches={selectedMatch} />
            )}
          </div>

          {/* Bottom of the modal */}
          <FormProvider {...createTicketForm}>
            <form onSubmit={handleSubmit(handleCreateTicket)} className="flex">
              <input
                {...register('stake')}
                className={`w-1/2 ${
                  !isWideVersion ? 'rounded-bl-md' : 'rounded-0 border-none'
                } shadow-sm px-3 py-2 text-zinc-800 focus:outline-none focus:ring-0`}
                placeholder="Valor da Aposta"
                /* onChange={(e) => handleStakeChange(e.target.value)} */
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-1/2 bg-green-500 text-white ${
                  !isWideVersion && 'rounded-br-md'
                } px-3 font-semibold text-sm hover:bg-green-400`}
              >
                {isSubmitting ? (
                  <div>
                    <Spinner />
                  </div>
                ) : (
                  <div>
                    Fazer Aposta
                    {/* <p className="text-xs font-normal">
                      {Number(jackpot) > 0 && `Retorno R$ ${jackpot}`}
                    </p> */}
                  </div>
                )}
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  )
}
