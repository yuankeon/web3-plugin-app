import { Card, Input, Form, Button, message } from 'antd';
import { CryptoUtils } from '../../utils/crypto'

export function Login() {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinishFailed = () => {
    messageApi.error('please input your info')
  }

  const onFinish = (values) => {
    const cryptoPassword = CryptoUtils.hmac256(values.password, 'DEFED')
    const params = {
      email: values.email,
      password: cryptoPassword,
      verifyCode: values.code,
    }
    console.log(params);
  }

  return (
    <main className='full-page-center'>
      <Card title="Login" bordered={false} style={{ width: 400 }}>
        {contextHolder}
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Code"
            name="code"
            rules={[{ required: true, message: 'Please input your code!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </main>
  )
}