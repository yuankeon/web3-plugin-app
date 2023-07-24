import { Button, Card, Spin, message } from "antd";
import { useDataStore } from 'src/store/dataStore'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from 'src/store/userStore'
import { shortAddress, header } from 'src/utils'
import './index.css'

export function Home() {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate()
  const systemData = useDataStore((state) => state.systemData)
  const userData = useUserStore((state) => state.userData)

  const checkLogin = () => {
    if (!userData) {
      messageApi.error('Please login first')
      return false
    }
    return true
  }

  /**
   * 
   * @param {string} act 
   * @returns
   */
  const action = (act) => {
    if (!checkLogin()) return
    console.log('666', act)
  }

  return (
    <div className="home">
      {contextHolder}
      <div className="header">
        {userData ? (
          <div className="account">
            {shortAddress(userData.proxyAddress)}
          </div>
        ) : (
          <Button type='primary' onClick={() => navigate('/login')}>Login</Button>
        )}
      </div>

      <div className="content">
        <Card title="DEFED Account" style={{ width: '1280px' }}>
          <div className="title">
            {header.map((item, index) => (
              <div className="title-item" style={{ width: item.width }} key={index}>
                {item.name}
              </div>
            ))}
          </div>
          {!systemData ? (
            <Spin tip="Loading...">
              <div className="loading" />
            </Spin>
          ) : systemData.map((item, index) => (
            <div className="token-item" key={index}>
              <div style={{ width: header[0].width }}>
                <img
                  src={`images/tokens/${item.name.toLowerCase()}.svg`}
                  alt=""
                />
                <span style={{ marginLeft: 4 }}>{item.symbol}</span>
              </div>
              <div style={{ width: header[1].width }}>
                <span>{item.savingBalance}</span>
              </div>
              <div style={{ width: header[2].width }}>
                <span>{item.savingBalance}</span>
              </div>
              <div style={{ width: header[3].width }}>
                <span>{item.variableBorrows}</span>
              </div>
              <div className="group" style={{ width: header[4].width }}>
                <Button
                  type="primary"
                  disabled={item.chainName === 'Ethereum'}
                  onClick={() => action('Deposit')}
                >
                  Deposit
                </Button>
                <Button type="primary" onClick={() => action('Withdraw')}>Withdraw</Button>
                <Button type="primary" onClick={() => action('Transfer')}>Transfer</Button>
                <Button type="primary" onClick={() => action('Borrow')}>Borrow</Button>
                <Button type="primary" onClick={() => action('Repay')}>Repay</Button>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}