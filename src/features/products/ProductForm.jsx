import { Form, Input, Button, Select, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useCategories } from '../categories/api'

export function ProductForm({ initial, onSubmit, loading }) {
  const { data: categories = [] } = useCategories()
  const [file, setFile] = useState(null)
  const [form] = Form.useForm()

  const handleFinish = values => {
    const fd = new FormData()
    fd.append('title', values.title)
    fd.append('description', values.description)
    fd.append('categoriesId', values.categoriesId)
    if (file) fd.append('image', file)
    onSubmit(fd)
  }

  return (
    <Form form={form} initialValues={initial} onFinish={handleFinish} layout="vertical">
      <Form.Item name="title" label="Название" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Описание">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item name="categoriesId" label="Категория" rules={[{ required: true }]}>
        <Select options={categories.map(c => ({ label: c.title, value: c.id }))} />
      </Form.Item>
      <Form.Item label="Изображение">
        <Upload beforeUpload={f => { setFile(f); return false }} maxCount={1}>
          <Button icon={<UploadOutlined />}>Загрузить фото</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initial ? 'Сохранить' : 'Создать'}
        </Button>
      </Form.Item>
    </Form>
  )
}
