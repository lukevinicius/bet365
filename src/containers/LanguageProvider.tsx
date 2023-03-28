import { ReactNode, useState } from 'react'

import { LanguageContext } from '@/hooks/useLanguage'

interface LanguageProviderProps {
  children: ReactNode
}

interface languages {
  name: string
  code: string
  flag: string
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<languages>({} as languages)

  async function changeLanguage() {
    const languageData = {
      name: 'Português',
      code: 'pt',
      flag: 'https://www.countryflags.io/br/flat/64.png',
    }

    setLanguage(languageData)
  }

  /* useEffect(() => {
    if (language.id === undefined) {
      const domain = window.location.hostname

      findLanguage(domain)
    }
  }, [language.id]) */

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
