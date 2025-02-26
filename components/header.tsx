import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="flex flex-col justify-center items-center col-start-[content-start] row-start-[header-start]">
      <div className="w-[300px]" id="logo">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex gap-[10px] justify-center font-mono text-md w-auto text-(--sub-color)" id="links">
        <Link href='/blog'>Blog</Link>
        <span>|</span>
        <Link href='/projects'>Projects</Link>
      </div>
    </header>
  )
}
