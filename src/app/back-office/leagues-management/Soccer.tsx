import {
  Box,
  HStack,
  Link,
  SimpleGrid,
  Spinner,
  useToast,
} from '@chakra-ui/react'
import { Link as LinkRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { RiStarFill, RiStarLine } from 'react-icons/ri'
import { useCompany } from '../../../hooks/useCompany'
import { api } from '@/services/api/axios'

/* interface IBodyUpdateStatusCountry {
  countryName: string
  status: boolean
}

interface IBodyUpdateStatusLeague {
  countryName: string
  leagueId: string
  name: string
  status: boolean
} */

interface IBodyUpdateFavoriteLeague {
  country: string
  leagueId: string
  status: boolean
  name: string
  favorite: boolean
}

interface ILeagues {
  id: string
  name: string
}

interface ICountry {
  countryName: string
  leagues: ILeagues[]
}

export function SoccerLeagues() {
  const { company, findCompany } = useCompany()
  const toast = useToast()
  const [leaguesByCountry, setLeaguesByCountry] = useState<ICountry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  /* async function handleUpdateStatusCountry({
    country,
    status,
  }: IBodyUpdateStatusCountry) {
    await api
      .put(`/soccer/leagues/update-status-country`, {
        companyId: company.id,
        country,
        status,
      })
      .then(async () => {
        await api.get('/soccer/leagues/active-leagues').then((response) => {
          setLeaguesByCountry(response.data)
        })

        toast({
          title: 'Sucesso',
          description: `Liga atualizada com sucesso`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      })
  }

  async function handleUpdateStatusLeague({
    country,
    leagueId,
    name,
    status,
  }: IBodyUpdateStatusLeague) {
    await api
      .put(`/soccer/leagues/update-status-league`, {
        companyId: company.id,
        country,
        leagueId,
        name,
        status,
      })
      .then(async () => {
        await api.get('/soccer/leagues/active-leagues').then((response) => {
          setLeaguesByCountry(response.data)
        })

        toast({
          title: 'Sucesso',
          description: `Liga atualizada com sucesso`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      })
  } */

  async function handleUpdateFavoriteLeague({
    country,
    leagueId,
    name,
    favorite,
    status,
  }: IBodyUpdateFavoriteLeague) {
    await api
      .put(`/update-league-status`, {
        companyId: company.id,
        country,
        leagueId,
        name,
        favorite,
        status,
      })
      .then(async () => {
        findCompany(window.location.pathname)
        toast({
          title: 'Sucesso',
          description: `Liga atualizada com sucesso`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      })
  }

  useEffect(() => {
    async function findGames() {
      await api.get('/soccer/leagues').then((response) => {
        setLeaguesByCountry(response.data)
        setIsLoading(false)
      })
    }

    findGames()
  }, [])

  return (
    <div>
      {!isLoading ? (
        <div>
          {leaguesByCountry.map((country) => (
            <div key={country.countryName}>
              {/* <div className="flex justify-between p-3">
                <Text>{country.countryName}</Text>
                <Form.Switch
                  checked={country.status}
                  onChange={() =>
                    handleUpdateStatusCountry({
                      country: country.countryName,
                      status: country.status,
                    })
                  }
                />
              </div> */}
              <SimpleGrid
                bg="gray.700"
                p="5"
                mb="3"
                columns={[1, 2, 3, 4]}
                spacing={3}
              >
                {country.leagues.map((league) => (
                  <Box display="flex" alignItems="center" key={league.id}>
                    <HStack spacing="3">
                      {/* <Form.Check
                        checked={league.status}
                        value={league.leagueId}
                        onChange={() =>
                          handleUpdateStatusLeague({
                            country: country.countryName,
                            name: league.name,
                            leagueId: league.leagueId,
                            status: league.status,
                          })
                        }
                      /> */}
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          console.log('teste')
                          handleUpdateFavoriteLeague({
                            country: country.countryName,
                            leagueId: league.id,
                            name: league.name,
                            status: true,
                            favorite: !(
                              company.bestLeagues &&
                              company.bestLeagues.find(
                                (bestLeague) =>
                                  bestLeague.leagueId === league.id &&
                                  bestLeague.favorite,
                              )
                            ),
                          })
                        }}
                      >
                        {company.bestLeagues &&
                        company.bestLeagues.find(
                          (bestLeague) =>
                            bestLeague.leagueId === league.id &&
                            bestLeague.favorite,
                        ) ? (
                          <RiStarFill size="1.3rem" color="red.500" />
                        ) : (
                          <RiStarLine size="1.3rem" />
                        )}
                      </div>
                    </HStack>
                    <Link
                      as={LinkRouter}
                      to={`/league-config/${league.id}`}
                      ml="2"
                    >
                      {league.name}
                    </Link>
                  </Box>
                ))}
              </SimpleGrid>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  )
}
