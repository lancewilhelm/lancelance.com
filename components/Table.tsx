import { PropsWithChildren } from 'react'

export default function Table({ children, ...props }: PropsWithChildren) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  )
}
