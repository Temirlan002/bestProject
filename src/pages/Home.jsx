import { Card, Select } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../features/products/api'
import { useCategories } from '../features/categories/api'

export default function Home() {
  const { data: products = [] } = useProducts()
  const { data: categories = [] } = useCategories()
  const [selectedCategory, setSelectedCategory] = useState(null)

  const filteredProducts = selectedCategory
    ? products.filter(p => p.categoriesId === selectedCategory)
    : products

  

  return (
    <div className="container">
      <h1>Каталог товаров</h1>
      <Select
        placeholder="Выберите категорию"
        onChange={setSelectedCategory}
        allowClear
        style={{ width: 200, marginBottom: 20 }}
        options={categories.map(c => ({ label: c.title, value: c.id }))}
      />
      <div className="grid">
        {filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <Card
              hoverable
              cover={<img src={product.image} alt={product.title} />}
              style={{ width: 240 }}
            >
              <Card.Meta title={product.title} description={product.categories?.title} />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
