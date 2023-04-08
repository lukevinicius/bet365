import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { SoccerLeagues } from './Soccer'

export function LeaguesManagement() {
  return (
    <Tabs>
      <TabList overflowX="auto" overflowY="hidden">
        <Tab>Futebol</Tab>
        <Tab isDisabled>Basquete</Tab>
        <Tab isDisabled>Beisebol</Tab>
        <Tab isDisabled>Boxe/MMA</Tab>
        <Tab isDisabled>Ciclismo</Tab>
        <Tab isDisabled>Corr. de Cavalos</Tab>
        <Tab isDisabled>Corr. de Galgos</Tab>
        <Tab isDisabled>Cricket</Tab>
        <Tab isDisabled>Dardo</Tab>
        <Tab isDisabled>Tênis</Tab>
        <Tab isDisabled>Handebol</Tab>
        <Tab isDisabled>Basquete</Tab>
        <Tab isDisabled>Basquete</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SoccerLeagues />
        </TabPanel>
        <TabPanel>2</TabPanel>
        <TabPanel>3</TabPanel>
      </TabPanels>
    </Tabs>
  )
}
