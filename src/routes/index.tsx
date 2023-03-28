import { Route, Routes } from 'react-router-dom'

import { Home } from '@/app/Home'
import { Header } from '@/components/Header'
import { SportsRoutes } from './sports.routes'
import { BackOfficeRoutes } from './back-office.routes'
import { BackOffice } from '@/app/back-office'
import { UsersList } from '@/app/back-office/users'
import { ForgotPassword } from '@/app/forgot-password'
import { SignUp } from '@/app/sign-up'
import { PlayerDetail } from '@/app/back-office/player-detail'
import { Casino } from '@/app/casino'

export function RoutesWeb() {
  return (
    <Routes>
      <Route path="*" element={<h1>404</h1>} />
      <Route
        path={'/forgot-password/:token' && '/forgot-password'}
        element={
          <>
            <Header />
            <ForgotPassword />
          </>
        }
      />
      <Route
        path="/sign-up"
        element={
          <>
            <Header />
            <SignUp />
          </>
        }
      />
      <Route
        path="/"
        element={
          <>
            <Header />
            <SportsRoutes>
              <Home />
            </SportsRoutes>
          </>
        }
      />
      <Route
        path="/casino"
        element={
          <>
            <Header />
            <SportsRoutes>
              <Casino />
            </SportsRoutes>
          </>
        }
      />
      <Route
        path="/back-office"
        element={
          <BackOfficeRoutes>
            <BackOffice />
          </BackOfficeRoutes>
        }
      />
      <Route
        path={'/back-office/players/:userId' && '/back-office/players'}
        element={
          <BackOfficeRoutes>
            <PlayerDetail />
          </BackOfficeRoutes>
        }
      />
      <Route
        path="/back-office/users"
        element={
          <BackOfficeRoutes>
            <UsersList />
          </BackOfficeRoutes>
        }
      />
    </Routes>
  )
}
