import { Form, Input, Button } from 'antd'
export function CategoryForm({ initial, onSubmit, loading }) {
  const [form] = Form.useForm()
  return (
    <Form form={form} initialValues={initial} onFinish={onSubmit} layout="inline">
      <Form.Item name="title" rules={[{ required: true }]}>
        <Input placeholder="Название категории" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initial ? 'Сохранить' : 'Создать'}
        </Button>
      </Form.Item>
    </Form>
  )
}
