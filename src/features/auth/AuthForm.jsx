import { Button, Form, Input } from 'antd'

export const AuthForm = ({ onSubmit, isLoading, isRegister = false }) => (
  <Form onFinish={onSubmit} layout="vertical">
    {isRegister && (
      <>
        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </>
    )}
    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
      <Input.Password />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" loading={isLoading}>
        {isRegister ? 'Register' : 'Login'}
      </Button>
    </Form.Item>
  </Form>
)
