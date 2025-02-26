interface blogCardProps {
  title: string
  description: string
  date: string
}

export default function BlogCard({title, description, date}: blogCardProps) {
  return (
  <div className="p-[5px] border-l-[3px] border-l-[--sub-color] hover:border-l-[--main-color] no-underline! transition duration-[300ms] blog-card">
    <div className='grid grid-cols-[auto_min-content] grid-rows-2] gap-x-[10px] gap-y-[5px]'>
      <div className="grid col-start-1 font-bold text-xl">{ title }</div>
      <div className="grid col-start-1 row-start-2 self-end">{ description }</div>
      <div className="grid col-start-2 row-span-2 self-center text-right text-(--sub-color) italic sm:text-nowrap">{ new
        Date(date).toLocaleDateString('en-GB', {
          day: 'numeric', month: 'long', year:
            'numeric'
        }) }</div>
    </div>
  </div>
  )
}
