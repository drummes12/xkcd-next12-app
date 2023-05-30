import { Text } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export function Comic({ id, title, img, alt, width, height }) {
  return (
    <Link href={`/comic/${id}`} key={id}>
      <Text h3 className='font-semibold text-sm text-center pb-2'>
        {title}
      </Text>
      <Image className='m-auto' width={width} height={height} src={img} alt={alt} />
    </Link>
  )
}
