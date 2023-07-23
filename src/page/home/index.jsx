import { Button, Card } from "antd";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { getSystemData } from "../../api/rpc";

export function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    getSystemData()
  }, [])

  return (
    <div className="home">
      <Button onClick={() => navigate('/login')}>Login</Button>
      <Card title="DEFED Account" style={{ width: 300 }} >
        <div className="token-item"></div>
      </Card>
    </div>
  )
}