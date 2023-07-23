import { useState } from 'react';
import { getSendVerifyCode } from '../api/login'

export function useEmailCode() {
  const [canCode, setCanCode] = useState(true)
  const [prefixStr, setPrefixStr] = useState('')

  const handleCode = async (email) => {
    setCanCode(false)
    const fetchData = await getSendVerifyCode({ email, token: '' })
    if (fetchData.code === 200) {
      //设置验证码的前缀
      setPrefixStr(fetchData.data)
    } else {
      throw Error(fetchData.msg)
    }
  }

  const resendCode = () => {
    setCanCode(true)
  }

  return { canCode, prefixStr, handleCode, resendCode }
}