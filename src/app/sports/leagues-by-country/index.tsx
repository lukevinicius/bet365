import { useEffect, useState } from 'react'
import { Link as LinkDom } from 'react-router-dom'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
  Spinner,
} from '@chakra-ui/react'
import { api } from '@/services/api/axios'

interface League {
  id: number
  name: string
}

interface Data {
  countryName: string
  leagues: League[]
}

export function LeaguesByCountry() {
  const sport = window.location.pathname.split('/')[2]
  const [data, setData] = useState<Data[]>([])
  const [loading, setLoading] = useState(true)

  async function findLeagues() {
    await api.get(`/${sport}/find-leagues`).then((response) => {
      setData(response.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    findLeagues()
  }, [])

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div>
          {data.map((country) => (
            <div key={country.countryName}>
              <Accordion
                key={country.countryName}
                defaultIndex={[0]}
                allowMultiple
              >
                <AccordionItem>
                  <AccordionButton
                    className="bg-[#838383]"
                    _hover={{
                      bg: '#838383',
                    }}
                  >
                    <span>{country.countryName}</span>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel
                    className={`grid grid-cols-1 lg:grid-cols-3 py-2 bg-[#646464]`}
                  >
                    {country.leagues.map((league) => (
                      <Link
                        _hover={{
                          textDecoration: 'none',
                          color: 'orange',
                        }}
                        py={2}
                        as={LinkDom}
                        to={`/sports/${sport}/${league.id}`}
                        key={league.id}
                        className="text-sm"
                      >
                        {league.name}
                      </Link>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
