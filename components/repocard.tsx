import githubLanguageColors from '@/public/githubcolors.json'
import GitHubIcon from '@/components/icons/github'
import StarIcon from '@/components/icons/star'
import ForkIcon from '@/components/icons/fork'

type Languages = Record<string, { color: string | null, url: string }>
const typedGithubColors: Languages = githubLanguageColors

interface RepoCardProps {
  repo: string
}

async function getRepoData(repo: string) {
  return await fetch('https://api.github.com/repos/' + repo)
    .then((res) => res.json())
}

export default async function RepoCard({ repo }: RepoCardProps) {
  const repoData = await getRepoData(repo)

  if (!repoData) return null;

  return (
    <div
      className="flex flex-col self-center gap-[5px] font-mono max-w-[300px] rounded-lg p-[10px] bg-[--sub-color] shadow-[4px_6px_0_rgba(0,0,0,1)] my-[10px]">
      <a href={repoData.html_url} className="no-underline!">
        <div className="flex items-center gap-[3px] fill-">
          <div className="text-[--main-color] translate-y-[-1px]" />
          <GitHubIcon fill="var(--main-color)" className='translate-y-[-1px]' />
          {repoData.full_name}
        </div>
      </a>
      <div className="italic font-sans">{repoData.description}</div>
      <div className="flex gap-[15px]">
        <div className="flex items-center justify-center align-center gap-[3px]">
          <div className="w-[15px] h-[15px] rounded-full" style={{ backgroundColor: typedGithubColors[repoData.language]?.color ?? undefined }}></div>
          {repoData.language}
        </div>
        <div className="flex items-center justify-center align-center gap-[3px]">
          <div className="flex text-[--main-color]" />
          <StarIcon fill="var(--main-color)" className='translate-y-[-1px]' />
          {repoData.stargazers_count}
        </div>
        <div className="flex items-center justify-center align-center gap-[3px]">
          <div className="text-[--main-color]" />
          <ForkIcon fill="var(--main-color)" className='translate-y-[-1px]' />
          {repoData.forks_count}
        </div>
      </div>
    </div >
  )
}
