import LinkWithIcon from '../NavBar/LinkWithIcon'
import useData from '../../hooks/useData'

function ProductsSidebar() {
  const { data: categories, error } = useData('/category')
  return (
    <aside className="py-2 px-5 rounded-[5px] bg-white">
      <h2 className="text-2xl mb-5">Category</h2>
      <div>
        {error && <em className="text-red-400">{error}</em>}
        {categories &&
          categories.map((c) => (
            <LinkWithIcon
              key={c._id}
              isSidebar
              linkTitle={c.name}
              link={`/products?category=${c.name}&page=1`}
              emoji={`http://localhost:5000/category/${c.image}`}
              id={c._id}
            ></LinkWithIcon>
          ))}
      </div>
    </aside>
  )
}
export default ProductsSidebar
