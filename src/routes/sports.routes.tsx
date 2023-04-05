import React from 'react'
import { Footer } from '@/components/Footer'
import { Sidebar } from '@/components/Siderbar'
import { useAuth } from '@/hooks/useAuth'
import { Link } from '@chakra-ui/react'
import { BetSummary } from '@/components/Modals/BetSummary'
import { useBet } from '@/hooks/useBet'

// import { BetSummary } from '../components/BetSummary';

export function SportsRoutes({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const { selectedMatch } = useBet()

  return (
    <>
      {window.location.pathname !== '/back-office' &&
        user.token &&
        user.role === 'ADMIN' && (
          <div className="bg-gray-300 text-black flex py-2 px-5 space-x-4 items-center">
            <Link href="/back-office">Painel</Link>
            <Link href="#">Afiliados</Link>
          </div>
        )}
      <div className="flex w-auto relative items-stretch h-full min-w-0">
        <div className="flex w-full items-stretch h-full">
          <Sidebar />
          <div className="position-sticky overflow-auto w-full overscroll-none bg-[rgb(61,61,61)]">
            <aside className="shadow-[0 0 20px rgba(0, 0, 0, 0.05)] rounded-[4rem]">
              {children}
              <Footer />
            </aside>
          </div>
        </div>
      </div>
      {selectedMatch.length > 0 && <BetSummary />}
    </>
  )
}
