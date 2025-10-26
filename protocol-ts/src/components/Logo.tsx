export function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props}>
      <div className="flex flex-col">
        <span className="text-lg font-black tracking-tight text-zinc-900 dark:text-white">
          UPA DESIGN SYSTEM
        </span>
      </div>
    </div>
  )
}
