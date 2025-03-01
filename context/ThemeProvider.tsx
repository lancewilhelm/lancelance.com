'use client';
import { createContext, useContext, ReactNode } from 'react'
import { useTheme } from '@/hooks/useTheme'

interface ThemeContextType {
  currentTheme: string
  setCurrentTheme: (themeName: string) => void
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeState = useTheme()
  return (
    <ThemeContext.Provider value={themeState} >
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
