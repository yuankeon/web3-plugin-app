import { Modal, Input, Button, message } from "antd";
import { useState } from "react";
import { useLend } from "src/hooks/useLend";
import { displayDecimal } from 'src/utils/math'
import { useUserStore } from 'src/store/userStore'

export function TxModal({ isModalOpen, handleCancel, actionTx, tokenData }) {
  const getContent = () => {
    switch (actionTx) {
      case 'Withdraw': return <Withdraw tokenData={tokenData} handleCancel={handleCancel} />
      default: return 'Coming Soon'
    }
  }

  return (
    <Modal
      title={actionTx}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={400}
      centered
    >
      {getContent()}
    </Modal>
  )
}

function Withdraw({ tokenData, handleCancel }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [amountInput, setAmountInput] = useState('')
  const [receiver, setReceiver] = useState('')

  const { userWithdraw } = useLend()
  const [setPasswordModalOpen, setModalClickFn] = useUserStore((state) => [
    state.setPasswordModalOpen,
    state.setModalClickFn,
  ])

  const withdrawAction = (privateKey) => {
    const { decimals, vtoken } = tokenData
    userWithdraw({ privateKey, decimals, amountInput, vtoken, receiver }).then(() => {
      message.success('Withdraw success!')
      setAmountInput('')
      setReceiver('')
      handleCancel()
    }).catch((error) => {
      message.error(error.message)
    })
  }

  const clickWithdraw = () => {
    if (!amountInput || !receiver) {
      messageApi.error('input first')
      return
    }
    setPasswordModalOpen()
    setModalClickFn(withdrawAction)
  }

  return (
    <div>
      {contextHolder}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Amount</span>
        <span>Balance: {displayDecimal(tokenData.savingBalance)}</span>
      </div>
      <Input value={amountInput} onChange={(e) => setAmountInput(e.target.value)} />
      <div style={{ height: 16 }} />

      <div>Withdraw to which Ethereum address</div>
      <Input value={receiver} onChange={(e) => setReceiver(e.target.value)} />

      <div style={{ height: 16 }} />
      <Button type="primary" onClick={clickWithdraw}>
        Withdraw
      </Button>
    </div>
  )
}