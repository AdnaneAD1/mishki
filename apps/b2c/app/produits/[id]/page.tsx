import { use } from 'react'
import { ProductDetail } from '@/apps/b2c/components/product-detail'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <ProductDetail productId={id} />
}
