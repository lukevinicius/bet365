import { QueryClientProvider } from 'react-query'

import { AuthProvider } from '@/containers/AuthProvider'
import { CompanyProvider } from '@/containers/CompanyProvider'
import { SidebarDrawerProvider } from '@/containers/SidebarDrawerProvider'
import { queryClient } from '@/services/queryClient'
import '@/styles/global.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { RoutesWeb } from './routes'
import { BetProvider } from './containers/BetProvider'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CompanyProvider>
        <AuthProvider>
          <BetProvider>
            <SidebarDrawerProvider>
              <RoutesWeb />
            </SidebarDrawerProvider>
          </BetProvider>
        </AuthProvider>
      </CompanyProvider>
    </QueryClientProvider>
  )
}

export default App
