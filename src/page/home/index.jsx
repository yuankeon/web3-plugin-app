import { Button, Card, Spin, message } from "antd";
import { useDataStore } from 'src/store/dataStore'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from 'src/store/userStore'
import { shortAddress, header } from 'src/utils'
import { displayDecimal } from 'src/utils/math'
import { useState } from "react";
import { TxModal } from 'src/components/TxModal'

import './index.css'

export function Home() {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate()
  const systemData = useDataStore((state) => state.systemData)
  const userData = useUserStore((state) => state.userData)

  const [showTxModal, setShowTxModal] = useState(false)
  const [actionTx, setActionTx] = useState('')

  const checkLogin = () => {
    if (!userData) {
      messageApi.error('Please login first')
      return false
    }
    return true
  }

  const action = (act) => {
    if (!checkLogin()) return
    setShowTxModal(true)
    setActionTx(act)
  }

  const handleCancel = () => {
    setShowTxModal(false)
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
                <span>{displayDecimal(item.savingBalance)}</span>
              </div>
              <div style={{ width: header[2].width }}>
                <span>{displayDecimal(item.creditBalance)}</span>
              </div>
              <div style={{ width: header[3].width }}>
                <span>{displayDecimal(item.variableBorrows)}</span>
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
                {item.chainName === 'Ethereum' ? (
                  <>
                    <Button type="primary" onClick={() => action('Borrow')}>Borrow</Button>
                    <Button type="primary" onClick={() => action('Repay')}>Repay</Button>
                  </>
                ) : (
                  <>
                    <div style={{ width: 78 }}></div>
                    <div style={{ width: 72 }}></div>
                  </>
                )}
              </div>
            </div>
          ))}
        </Card>
      </div>

      <TxModal
        isModalOpen={showTxModal}
        handleCancel={handleCancel}
        actionTx={actionTx}
      />
    </div>
  )
}