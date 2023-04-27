import { Link } from 'react-router-dom'
import { useCompany } from '@/hooks/useCompany'
import { RiStarSFill } from 'react-icons/ri'

export function BestLeagues() {
  const { company } = useCompany()

  return (
    <div className="w-full px-1 pb-1">
      <div className="flex items-center bg-blue-900 font-bold py-1 px-2 rounded-t-md">
        <RiStarSFill size={'20px'} />
        <p className="text-sm">Melhores ligas</p>
      </div>
      <div className={`grid grid-cols-2 bg-[#646464] rounded-b-md`}>
        {company.bestLeagues.map((league) => (
          <>
            {league.favorite && (
              <Link
                to={`/sports/soccer/${league.leagueId}`}
                key={league.leagueId}
                className="py-1 px-2 text-sm bg-[#646464] border-b-[1px] border-[#6e6e6e] border-r-[1px] hover:bg-[#6e6e6e]"
              >
                {league.country} - {league.name}
              </Link>
            )}
          </>
        ))}
      </div>
    </div>
  )
}
