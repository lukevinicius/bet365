import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'

import { AuthProvider } from '@/containers/AuthProvider'
import { CompanyProvider } from '@/containers/CompanyProvider'
import { SidebarDrawerProvider } from '@/containers/SidebarDrawerProvider'
import { queryClient } from '@/services/queryClient'

import { theme } from '@/styles/theme'
import '@/styles/global.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { RoutesWeb } from './routes'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <CompanyProvider>
          <AuthProvider>
            <SidebarDrawerProvider>
              <RoutesWeb />
            </SidebarDrawerProvider>
          </AuthProvider>
        </CompanyProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
