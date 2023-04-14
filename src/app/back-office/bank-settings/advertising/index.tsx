import { useEffect, useState } from 'react'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
} from '@chakra-ui/react'
import { useCompany } from '@/hooks/useCompany'
import { BannersManagement } from './Banners'

export function Advertising() {
  const { company } = useCompany()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  return (
    <div>
      {loading ? (
        <div className="text-center">
          <Spinner size="xl" />
        </div>
      ) : (
        <Tabs>
          <TabList>
            <Tab>Banners</Tab>
            <Tab>Logos de times</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <BannersManagement banners={company.banners} />
            </TabPanel>
            <TabPanel>
              <p>two!</p>

              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </div>
  )
}
