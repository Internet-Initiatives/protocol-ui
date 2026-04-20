import Image from 'next/image'
import symbolBlack from '@/images/upa-symbol-black.svg'
import symbolYellow from '@/images/upa-symbol-yellow.svg'

export function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props}>
      <Image
        src={symbolBlack}
        alt="Ultimate Performance Academy"
        className="block h-full w-auto dark:hidden"
        priority
      />
      <Image
        src={symbolYellow}
        alt="Ultimate Performance Academy"
        className="hidden h-full w-auto dark:block"
        priority
      />
    </div>
  )
}
