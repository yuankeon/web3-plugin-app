import './App.css'
import { Route, Routes } from "react-router-dom";
import { Home } from './page/home';
import { Login } from './page/login';
import { getSystemData } from "./api/rpc";
import { useDataStore } from './store/dataStore'
import { useEffect } from "react";
import { message } from 'antd'

function App() {
  const [messageApi, contextHolder] = message.useMessage()
  const setSystemData = useDataStore((state) => state.setSystemData)

  const initData = () => {
    getSystemData().then((res) => {
      setSystemData(res)
    }).catch((error) => {
      messageApi.error(error.message)
    })
  }

  useEffect(() => {
    initData()
  }, [])

  return (
    <>
      {contextHolder}
      <div className="background-radial-gradient"></div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
