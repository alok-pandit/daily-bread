import Image from 'next/image'
import { LegacyRef, forwardRef } from 'react'

import { clmx } from '@/utils'

const ProductCard = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any,
  ref?: LegacyRef<HTMLDivElement> | undefined
) => {
  // eslint-disable-next-line no-console
  console.log(
    props.product.images,
    props.product.images.length,
    props.product.images[0]
  )
  return (
    <div
      ref={ref}
      className={clmx(
        `text-white backdrop-blur-4xl tinted-glass`,
        `border-1 rounded-md border-yellow-200`,
        `shadow-md shadow-primary-300 hover:scale-105`,
        `transition-all cursor-pointer`
      )}
    >
      <Image
        src={String(props.product.images[0])}
        alt={'grocery img'}
        className="w-full max-h-full rounded-t-md"
        height={350}
        width={400}
        priority
      />
      <div className="p-2">
        <p>Name: {props.product.name}</p>
        <p>Description: {props.product.description}</p>
        <p></p>
        <p>Price: ${props.product.price}</p>
      </div>
    </div>
  )
}

export default forwardRef(ProductCard)
