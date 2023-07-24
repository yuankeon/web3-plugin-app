import { Card, Input, Form, Button, message, Statistic } from 'antd';
import { CryptoUtils } from '../../utils/crypto'
import { WalletUtils } from '../../utils/wallet'
import { useRef, useState } from 'react';
import { getEmailNonce, getTokenAPI, getAccountDataAPI } from '../../api/login'
import { getSystemData } from "../../api/rpc";
import { useEmailCode } from '../../hooks/useEmailCode'
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'
import { useDataStore } from '../../store/dataStore'

const { Countdown } = Statistic;

export function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false)
  const emailRef = useRef(null)

  const { canCode, resendCode, handleCode, prefixStr } = useEmailCode()
  const setUserData = useUserStore((state) => state.setUserData)
  const setSystemData = useDataStore((state) => state.setSystemData)
  const navigate = useNavigate()

  const onFinishFailed = () => {
    messageApi.error('please input your info')
  }

  const sendCode = () => {
    const eamil = emailRef.current?.input?.value
    if (!eamil) {
      messageApi.error('please input your info')
      return
    }
    handleCode(eamil).catch((error) => messageApi.error(error.message))
  }

  const onFinish = async (values) => {
    setLoading(true)
    const cryptoPassword = CryptoUtils.hmac256(values.password, 'DEFED')
    const params = {
      email: values.email,
      password: cryptoPassword,
      verifyCode: values.code,
    }
    try {
      const result = await getEmailNonce(params)
      const { nonce, privateKey } = result
      //解密私钥
      const originPrivateKey = CryptoUtils.decrypt(privateKey, values.password)
      const { address } = WalletUtils.getWallet(originPrivateKey)
      const text = `Sign in with DEFED Distributed Digital Identity. Nonce:${nonce}`
      const { signature } = new Web3().eth.accounts.sign(text, originPrivateKey)
      const res = await getTokenAPI({ signature, address })
      //请求token之后获取用户信息，缓存token
      localStorage.setItem('token', res.token)
      const userData = await getAccountDataAPI()
      //获取用户的资产数据
      const assetData = await getSystemData(userData.proxyAddress)
      setUserData(userData)
      setSystemData(assetData)
      navigate('/', { replace: true })
    } catch (error) {
      messageApi.error(error.message)
    } finally {
      setLoading(false)
    }
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
            <Input style={{ height: 42 }} ref={emailRef} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password style={{ height: 42 }} />
          </Form.Item>

          <Form.Item
            label="Code"
            name="code"
            rules={[{ required: true, message: 'Please input your code!' }]}
          >
            <Input
              style={{ height: 42 }}
              prefix={prefixStr ? `${prefixStr}-` : null}
              suffix={(
                canCode ? (
                  <Button
                    type='link'
                    style={{ padding: 0 }}
                    onClick={sendCode}
                  >
                    Get code
                  </Button>
                ) : (
                  <Countdown
                    format='ss'
                    value={Date.now() + 60 * 1000}
                    onFinish={resendCode}
                  />
                )
              )} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </main>
  )
}