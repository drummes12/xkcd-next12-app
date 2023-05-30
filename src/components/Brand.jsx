import { Text } from '@nextui-org/react'
import Link from 'next/link'

export function Brand() {
  return (
    <Text h2 className='font-bold text-xl' color='inherit'>
      <Link href='/' className='transition hover:opacity-80'>
        next
        <Text span style={{ fontWeight: 'lighter' }}>
          xkcd
        </Text>
      </Link>
    </Text>
  )
}
