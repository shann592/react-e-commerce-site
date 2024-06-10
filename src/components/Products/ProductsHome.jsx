import ProductsList from './ProductsList'
import ProductsSidebar from './ProductsSidebar'

function ProductsHome() {
  return (
    <section className="grid grid-cols-[1fr,4fr] p-5">
      <ProductsSidebar />
      <ProductsList />
    </section>
  )
}
export default ProductsHome
