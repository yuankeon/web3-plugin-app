import { Modal, Input, Button, message } from "antd";
import { useRef } from "react";
import { useUserStore } from "src/store/userStore";
import { CryptoUtils } from 'src/utils/crypto';

export function PasswordModal() {
  const [messageApi, contextHolder] = message.useMessage();
  const passwordRef = useRef(null)

  const [
    userData,
    passwordModalOpen,
    setPasswordModalOpen,
    modalClickFn,
    setModalClickFn
  ] = useUserStore((state) => [
    state.userData,
    state.passwordModalOpen,
    state.setPasswordModalOpen,
    state.modalClickFn,
    state.setModalClickFn,
  ])

  const handleClick = () => {
    const password = passwordRef.current.input.value
    const privateKey = userData.privateKey
    try {
      //解密私钥
      const originPrivateKey = CryptoUtils.decrypt(privateKey, password)
      //执行回调函数
      modalClickFn && modalClickFn(originPrivateKey)
      //解密完执行方法之后，清空数据
      setPasswordModalOpen(false)
      setModalClickFn(undefined)
    } catch (error) {
      messageApi.error(error.message)
    }
  }

  return (
    <Modal
      title={'Enter your password'}
      open={passwordModalOpen}
      onCancel={setPasswordModalOpen}
      footer={null}
      width={400}
    >
      {contextHolder}
      <Input.Password ref={passwordRef} style={{ height: 42 }} />
      <Button type="primary" onClick={handleClick} style={{ width: '100%', marginTop: 16 }}>OK</Button>
    </Modal>
  )
}