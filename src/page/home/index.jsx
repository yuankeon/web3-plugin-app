import { Button, Card, Spin } from "antd";
import { useDataStore } from '../../store/dataStore'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'

import './index.css'

const header = [
  {
    name: 'Asset',
    width: '15%'
  },
  {
    name: 'My Balance',
    width: '15%',
  },
  {
    name: 'My Credit',
    width: '15%',
  },
  {
    name: 'My Debt',
    width: '15%',
  },
  {
    name: 'Operation',
    width: '40%',
  }
]

export function Home() {
  const navigate = useNavigate()
  const systemData = useDataStore((state) => state.systemData)
  const userData = useUserStore((state) => state.userData)

  return (
    <div className="home">
      <div className="header">
        {userData ? (
          <div>
            {userData.proxyAddress}
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
                <Button type="primary" disabled={item.chainName === 'Ethereum'}>Deposit</Button>
                <Button type="primary">Withdraw</Button>
                <Button type="primary">Transfer</Button>
                <Button type="primary">Borrow</Button>
                <Button type="primary">Repay</Button>
              </div>
            </div>
          ))}
        </Card>
      </div>


    </div>
  )
}