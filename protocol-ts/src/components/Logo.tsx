export function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props}>
      <div className="flex flex-col">
        <span className="text-lg font-black tracking-tight text-zinc-900 dark:text-white">
          UPA DESIGN SYSTEM
        </span>
        <span className="mt-0.5 text-xs font-semibold text-zinc-500 dark:text-[#FFCB05]">
          Professional & Accessible
        </span>
      </div>
    </div>
  )
}
