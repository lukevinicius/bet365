import { ReactNode, useEffect, useState } from 'react'

import { CompanyContext } from '@/hooks/useCompany'
import { api } from '@/services/api/axios'
import { setCookie } from 'nookies'
import { ICompany } from '@/domain/interfaces/ICompany'

interface CompanyProviderProps {
  children: ReactNode
}

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [company, setCompany] = useState<ICompany>({} as ICompany)
  const companyStorageKey = '@company'

  async function findCompany() {
    const { data } = await api.get('/company/by-domain')

    const companyData = {
      id: data.id,
      name: data.name,
      logo: data.logo,
      cnpj: data.cnpj,
      banners: data.banners,
      shieldTeams: data.shieldTeams,
      institutional: data.institutional,
      bestLeagues: data.leaguesConfig,
    }

    setCookie(undefined, '@companyId', companyData.id)
    await sessionStorage.setItem(companyStorageKey, JSON.stringify(companyData))

    setCompany(companyData)
  }

  useEffect(() => {
    async function loadCompanyStorageDate() {
      const companyStoraged = await sessionStorage.getItem(companyStorageKey)

      if (companyStoraged) {
        const companyLogged = JSON.parse(companyStoraged) as ICompany
        await setCompany(companyLogged)
      } else {
        await findCompany()
      }
    }

    loadCompanyStorageDate()
  }, [companyStorageKey])

  return (
    <CompanyContext.Provider
      value={{
        company,
        findCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  )
}
