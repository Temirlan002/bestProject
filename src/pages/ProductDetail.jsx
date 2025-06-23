import { useParams } from 'react-router-dom'
import { useProduct } from '../features/products/api'

export default function ProductDetail() {
  const { id } = useParams()
  const { data: product } = useProduct(id)

  if (!product) return <p>Загрузка...</p>

  return (
    <div className="container">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width="300" />
      <p>{product.description}</p>
      <p>Категория: {product.categories?.title}</p>
      <div>
        {product.images?.map((img, i) => (
          <img key={i} src={img} alt="" width="100" />
        ))}
      </div>
    </div>
  )
}
