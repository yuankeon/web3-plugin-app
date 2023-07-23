import './App.css'
import { Route, Routes } from "react-router-dom";
import { Home } from './page/home';
import { Login } from './page/login';
import { getSystemData } from "./api/rpc";
import { useDataStore } from './store/dataStore'
import { useUserStore } from './store/userStore'
import { useEffect } from "react";
import { message } from 'antd'
import { getAccountDataAPI } from './api/login'

function App() {
  const [messageApi, contextHolder] = message.useMessage()
  const setSystemData = useDataStore((state) => state.setSystemData)
  const setUserData = useUserStore((state) => state.setUserData)

  const initData = (proxy) => {
    getSystemData(proxy).then((res) => {
      setSystemData(res)
    }).catch((error) => {
      messageApi.error(error.message)
    })
  }

  const initUserInfo = () => {
    getAccountDataAPI()
      .then((userResult) => {
        setUserData(userResult)
        initData(userResult.proxyAddress)
      })
      .catch((error) => {
        messageApi.error(error.message)
      })
  }

  //刷新页面使用缓存 token 去请求用户信息
  useEffect(() => {
    if (localStorage.getItem('token')) {
      initUserInfo()
    } else {
      initData(undefined)
    }
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
