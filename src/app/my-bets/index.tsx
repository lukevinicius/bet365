import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export function MyBets() {
  return (
    <Tabs>
      <TabList>
        <Tab>Pendentes</Tab>
        <Tab>Resolvidas</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
