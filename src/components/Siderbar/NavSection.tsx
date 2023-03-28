import { ReactNode } from 'react'

type NavSectionProps = {
  title: string
  children: ReactNode
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <div className="w-full">
      <p className="uppercase text-sm text-white ml-5 font-bold">{title}</p>
      <div className="flex mt-5 flex-col">{children}</div>
    </div>
  )
}
