import { ICompany } from '@/domain/interfaces/ICompany'
import { useContext, createContext } from 'react'

interface CompanyContextData {
  company: ICompany
  findCompany(domain: string): Promise<void>
}

export const CompanyContext = createContext({} as CompanyContextData)

export function useCompany() {
  const context = useContext(CompanyContext)

  return context
}
