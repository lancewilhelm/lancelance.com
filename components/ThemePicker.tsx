import themesList from '@/public/themes.json'
import { useTheme } from '@/hooks/useTheme'

type Theme = {
  name: string
  bgColor: string
  mainColor: string
  subColor: string
  textColor: string
}

const themes = JSON.parse(JSON.stringify(themesList)).sort((a: Theme, b: Theme) => a.name.localeCompare(b.name))

interface ThemeRowProps {
  theme: Theme
  onThemeSelect: (themeName: string) => void
  isActiveTheme: boolean
}

function ThemeRow({ theme, onThemeSelect, isActiveTheme }: ThemeRowProps) {
  return (
    <div
      className={'grid grid-cols-[1fr_auto] justify-center cursor-pointer px-2'}
      onClick={() => onThemeSelect(theme.name)}
    >
      <div className='flex justify-end text-sm items-center font-bold font-mono pr-2'>
        <div className={`px-2 py-1 rounded-full ${isActiveTheme ? 'bg-[--main-color] text-[--bg-color]' : null}`}>
          {theme.name}
        </div>
      </div>
      <div className={`grid grid-cols-3 gap-1 items-center justify-center p-[5px] border-2 rounded-full ${isActiveTheme ? 'border-[--main-color]' : 'border-[--bg-color]'}`} style={{ background: theme.bgColor }}>
        <div className='w-4 h-4 rounded-full' style={{ background: theme.mainColor }} />
        <div className='w-4 h-4 rounded-full' style={{ background: theme.subColor }} />
        <div className='w-4 h-4 rounded-full' style={{ background: theme.textColor }} />
      </div>
    </div >
  )
}

export default function ThemePicker() {
  const { currentTheme, setCurrentTheme } = useTheme()

  return (
    <div id="theme-picker-scroll" className="grid items-center justify-center h-full">
      <div id="theme-picker-content"
        className="grid bg-[--bg-color] border-[3px] border-[--main-color] rounded-lg h-[75dvh] overflow-y-auto gap-1 py-2">
        {themes.map((theme: Theme) => (
          <ThemeRow key={theme.name} theme={theme} onThemeSelect={setCurrentTheme} isActiveTheme={theme.name === currentTheme} />
        ))}
      </div>
    </div>
  )
}
