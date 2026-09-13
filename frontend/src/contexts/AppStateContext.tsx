import { createContext, useContext, useState, type ReactNode } from "react"

interface AppState {
  onboardingComplete: boolean
  setOnboardingComplete: (v: boolean) => void
  tourActive: boolean
  startTour: () => void
  endTour: () => void
}

const AppStateContext = createContext<AppState | undefined>(undefined)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [onboardingComplete, setOnboardingComplete] = useState(true)
  const [tourActive, setTourActive] = useState(false)

  return (
    <AppStateContext.Provider
      value={{
        onboardingComplete,
        setOnboardingComplete,
        tourActive,
        startTour: () => setTourActive(true),
        endTour: () => setTourActive(false),
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider")
  return ctx
}
