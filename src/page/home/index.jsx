import { Button, Card } from "antd";
import { useNavigate } from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <Button onClick={() => navigate('/login')}>Login</Button>
      <Card title="Default size card" style={{ width: 300 }} >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  )
}