import { Logo } from './Logo'

export function HeaderAccount() {
  return (
    <>
      <header
        className={`flex w-full mx-auto justify-center bg-blue-900 h-[110px] lg:px-2`}
      >
        <Logo />
      </header>
    </>
  )
}
