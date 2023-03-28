import React from 'react'
import { DashboardSidebar } from '@/components/Siderbar/dashboard'
import { Header } from '@/components/Header'

// import { BetSummary } from '../components/BetSummary';

export function BackOfficeRoutes({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex w-auto relative items-stretch h-full min-w-0">
        <div className="flex w-full items-stretch h-full">
          <DashboardSidebar />
          <div className="position-sticky overflow-auto w-full overscroll-none">
            <aside className="shadow-[0 0 20px rgba(0, 0, 0, 0.05)] rounded-[4rem]">
              {children}
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
