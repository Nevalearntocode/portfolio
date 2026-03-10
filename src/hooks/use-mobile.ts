import * as React from "react"
import { owner } from "@/data/owner"

const MOBILE_BREAKPOINT = 768

export function useMessengerUrl() {
  const isMobile = useIsMobile()
  return isMobile ? owner.socials.messengerMobile : owner.socials.messenger
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
