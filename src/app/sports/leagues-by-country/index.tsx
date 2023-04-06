import { useEffect, useState } from 'react'
import { Link as LinkDom } from 'react-router-dom'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Link,
  useBreakpointValue,
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
  const [data, setData] = useState<Data[]>([])

  async function findLeagues() {
    await api
      .get('/find-leagues', {
        params: {
          sportId: '1',
        },
      })
      .then((response) => {
        setData(response.data)
      })
  }

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  })

  useEffect(() => {
    findLeagues()
  }, [])

  return (
    <div>
      {data &&
        data.map((country) => (
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
                  <Box as="span" flex="1" textAlign="left">
                    {country.countryName}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel
                  className={`grid ${
                    isWideVersion ? 'grid-cols-1' : 'grid-cols-3'
                  } py-2 bg-[#646464]`}
                >
                  {country.leagues.map((league) => (
                    <Link
                      _hover={{
                        textDecoration: 'none',
                        color: 'orange',
                      }}
                      py={2}
                      as={LinkDom}
                      to={`/sports/soccer/${league.id}`}
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
  )
}
