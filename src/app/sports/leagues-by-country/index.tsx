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
} from '@chakra-ui/react'

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
    await fetch(
      `http://localhost:3333/find-leagues` +
        '?' +
        new URLSearchParams({
          sportId: '1',
        }),
      {
        method: 'GET',
      },
    ).then((res) => {
      res.json().then((data) => {
        setData(data)
      })
    })
  }

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
                <AccordionButton className="bg-[#838383]">
                  <Box as="span" flex="1" textAlign="left">
                    {country.countryName}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel p={4} className="bg-[#646464]">
                  {country.leagues.map((league) => (
                    <Link
                      _hover={{
                        textDecoration: 'none',
                        color: 'orange',
                      }}
                      as={LinkDom}
                      to="#"
                      key={league.id}
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
