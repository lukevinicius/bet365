// import { useBreakpointValue } from '@chakra-ui/react'
// import { useState } from 'react'
// import { Desktop } from './Desktop'
// import { Mobile } from './Mobile'

export function GamesByBestLeague() {
  /* const [matches] = useState<IResponse>(response)

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  }) */

  return (
    <div>
      <div className="bg-blue-900 py-1 px-5 rounded-t-md">
        {/* <p className="font-bold">{matches.leagueName}</p> */}
        <span>Sport - Country</span>
      </div>
      <div>
        {/* {matches.matchesByDate.map((matchByDate) => (
          <div key={new Date(matchByDate.date).toLocaleDateString('pt-br')}>
            {isWideVersion ? (
              <Mobile date={matchByDate.date} matches={matchByDate.matches} />
            ) : (
              <Desktop date={matchByDate.date} matches={matchByDate.matches} />
            )}
          </div>
        ))} */}
      </div>
    </div>
  )
}
