import { Link } from 'react-router-dom'
import { useState } from 'react'
import BestLeaguesData from './data.json'

interface BestLeaguesProps {
  id: number
  name: string
}

export function BestLeagues() {
  const [leagues] = useState<BestLeaguesProps[]>(BestLeaguesData)

  /* const response = await fetch('http://localhost:3000/api/leagues')

  const data = await response.json() */

  return (
    <div>
      <div className="bg-blue-900 font-bold py-1 px-5 rounded-t-md">
        Logo - Melhores ligas
      </div>
      <div className={`grid grid-cols-2 bg-[#646464] rounded-b-md`}>
        {leagues.map((league) => {
          return (
            <Link
              to={`/leagues/${league.id}`}
              key={league.id}
              className="py-1 px-5 bg-[#646464] border-b-[1px] border-[#6e6e6e] border-r-[1px] hover:bg-[#6e6e6e]"
            >
              {league.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
