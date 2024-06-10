import ProductCard from '../Products/ProductCard'
import useData from '../../hooks/useData'
import { ProdCardSkeleton } from '../Products/ProdCardSkeleton'

function FeaturedProducs() {
  const { error, data, isLoading } = useData('/products/featured')

  return (
    <section className="m-16">
      <h2 className="text-5xl text-center mb-16 font-bold">
        Featured Products
      </h2>
      <div className="flex items-center justify-evenly mb-16">
        {data && data.map((fp) => <ProductCard key={fp._id} product={fp} />)}
        {isLoading &&
          Array(3)
            .fill(0)
            .map((skCard, idx) => <ProdCardSkeleton key={idx} />)}
        {/* <ProductCard />
        <ProductCard />
        <ProductCard /> */}
      </div>
    </section>
  )
}
export default FeaturedProducs
