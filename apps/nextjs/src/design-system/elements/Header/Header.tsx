import Link from "next/link"
import { AiOutlineMenu } from "react-icons/ai"
import { HiPhone } from "react-icons/hi"
import { Button } from "src/design-system/index"

import HeaderNav from "./HeaderNav"

export const Header = () => {
  return (
    <header className="flex items-center justify-between py-5">
      <div className="flex items-center gap-8 xl:gap-16">
        <Link href="/">I</Link>
        <HeaderNav />
      </div>
      <div className="hidden gap-2 lg:flex">
        <Button intent="secondary">Login</Button>
        <Button intent="secondary">Join us</Button>

        <Button className="flex items-center gap-1">
          <HiPhone /> Call (737) 237-2900
        </Button>
      </div>
      <div className="flex gap-4 lg:hidden">
        <button className="text-2xl" aria-label="Mobile menu">
          <AiOutlineMenu />
        </button>
      </div>
    </header>
  )
}
