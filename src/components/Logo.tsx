import Image from 'next/image'
import logoBlack from '@/images/upa-logo-black.svg'
import logoYellow from '@/images/upa-logo-yellow.svg'

export function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props}>
      <Image
        src={logoBlack}
        alt="UPA Design System"
        className="block h-full w-auto dark:hidden"
        priority
      />
      <Image
        src={logoYellow}
        alt="UPA Design System"
        className="hidden h-full w-auto dark:block"
        priority
      />
    </div>
  )
}
