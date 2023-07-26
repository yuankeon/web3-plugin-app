import { Modal } from "antd";

export function TxModal({ isModalOpen, handleCancel, actionTx }) {
  return (
    <Modal
      title={actionTx}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}