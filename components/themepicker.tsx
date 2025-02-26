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

function ThemeRow({ theme, onThemeSelect }: { theme: Theme, onThemeSelect: (themeName: string) => void }) {
  return (
    <div
      className='grid grid-cols-[1fr_auto] justify-center cursor-pointer px-2'
      onClick={() => onThemeSelect(theme.name)}
    >
      <div className='flex text-sm items-center font-bold font-mono'>
        {theme.name}
      </div>
      <div className='grid grid-cols-3 gap-1 items-center justify-center p-2 rounded-full' style={{ background: theme.bgColor }}>
        <div className='w-4 h-4 rounded-full' style={{ background: theme.mainColor }} />
        <div className='w-4 h-4 rounded-full' style={{ background: theme.subColor }} />
        <div className='w-4 h-4 rounded-full' style={{ background: theme.textColor }} />
      </div>
    </div>
  )
}

export default function ThemePicker() {
  const { setCurrentTheme } = useTheme()

  return (
    <div id="theme-picker-scroll" className="grid items-center justify-center h-full">
      <div id="theme-picker-content"
        className="grid bg-[--bg-color] border-[3px] border-[--main-color] rounded-lg h-[75dvh] w-72 sm:w-96 overflow-y-auto gap-1 py-2">
        {themes.map((theme: Theme) => (
          <ThemeRow key={theme.name} theme={theme} onThemeSelect={setCurrentTheme} />
        ))}
      </div>
    </div>
  )
}
