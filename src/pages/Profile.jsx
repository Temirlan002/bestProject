import { useAuthStore } from '../app/store'
import { useCreateProduct, useDeleteProduct, useProducts } from '../features/products/api'
import { ProductForm } from '../features/products/ProductForm'

export default function Profile() {
  const user = useAuthStore(s => s.user)
  const { data: products = [] } = useProducts()
  const create = useCreateProduct()
  const del = useDeleteProduct()
  const my = products?.filter(p => p.userId === user?.id) || []

  return (
    <div>
      <h2>Мои товары</h2>
      <ProductForm onSubmit={data => create.mutate(data)} loading={false} />
      {my.map(p => (
        <div key={p.id}>
          <h4>{p.title}</h4>
          <p>{p.description}</p>
          <Button danger onClick={() => del.mutate(p.id)}>Удалить</Button>
        </div>
      ))}
    </div>
  )
}
