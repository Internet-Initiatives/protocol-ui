export function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props}>
      <div className="flex flex-col gap-0">
        <span className="text-base font-black tracking-tight text-zinc-900 dark:text-white lg:text-lg">
          UPA DESIGN SYSTEM
        </span>
      </div>
    </div>
  )
}