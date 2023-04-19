import { IMatch } from '@/domain/interfaces/IMatch'
import { useBet } from '@/hooks/useBet'
import { RiCloseLine } from 'react-icons/ri'

export function SingleBetSummary(match: IMatch) {
  const { handleRemoveMatch } = useBet()

  return (
    <>
      <div className="flex py-3">
        <div className="px-5" onClick={() => handleRemoveMatch(match)}>
          <RiCloseLine cursor="pointer" color="black" />
        </div>
        <div>
          {match.market.map((market) => (
            <div key={market.id}>
              <div className="flex space-x-2">
                <p className="font-bold text-sm text-zinc-900">
                  {market.option}
                </p>
                <p className="font-bold text-sm text-blue-900">{market.odd}</p>
              </div>
              <p className="text-xs text-zinc-600">{market.name}</p>
            </div>
          ))}
          <p className="text-xs text-zinc-600">
            {match.localTeam} X {match.visitorTeam}
          </p>
        </div>
      </div>
    </>
  )
}
