import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { PersonalData } from './PersonalData'

export function Account() {
  return (
    <div className="mt-[-40px]">
      <Tabs className="px-32 bg-transparent" variant="enclosed">
        <TabList>
          <Tab _selected={{ color: 'white', bg: '#3d3d3d' }}>Início</Tab>
          <Tab _selected={{ color: 'white', bg: '#3d3d3d' }}>Banco</Tab>
          <Tab _selected={{ color: 'white', bg: '#3d3d3d' }}>Histórico</Tab>
          <Tab _selected={{ color: 'white', bg: '#3d3d3d' }}>Perfil</Tab>
        </TabList>
        <TabPanels className="bg-[#3d3d3d] ">
          <TabPanel>
            <p>Início</p>
          </TabPanel>
          <TabPanel>
            <p>Banco</p>
          </TabPanel>
          <TabPanel>
            <p>Histórico</p>
          </TabPanel>
          <TabPanel>
            <PersonalData />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
