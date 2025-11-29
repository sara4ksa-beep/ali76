import { ProductDetail } from '@/components/products/ProductDetail';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <ProductDetail productId={id} />
      </div>
    </div>
  );
}


