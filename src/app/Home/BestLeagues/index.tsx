import { Link } from 'react-router-dom'
import { useCompany } from '@/hooks/useCompany'

export function BestLeagues() {
  const { company } = useCompany()

  return (
    <div>
      <>
        <div className="bg-blue-900 font-bold py-1 px-5 rounded-t-md">
          Melhores ligas
        </div>
        <div className={`grid grid-cols-2 bg-[#646464] rounded-b-md`}>
          {company.bestLeagues.map((league) => (
            <>
              {league.favorite && (
                <Link
                  to={`/leagues/${league.leagueId}`}
                  key={league.leagueId}
                  className="py-1 px-5 bg-[#646464] border-b-[1px] border-[#6e6e6e] border-r-[1px] hover:bg-[#6e6e6e]"
                >
                  {league.country} - {league.name}
                </Link>
              )}
            </>
          ))}
        </div>
      </>
    </div>
  )
}
