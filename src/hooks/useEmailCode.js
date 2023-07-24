import { useState } from 'react';
import { getSendVerifyCode } from 'src/api/login'

export function useEmailCode() {
  const [canCode, setCanCode] = useState(true)
  const [prefixStr, setPrefixStr] = useState('')

  const handleCode = async (email) => {
    setCanCode(false)
    const fetchData = await getSendVerifyCode({ email, token: '' })
    //设置验证码的前缀
    setPrefixStr(fetchData)
  }

  const resendCode = () => {
    setCanCode(true)
  }

  return { canCode, prefixStr, handleCode, resendCode }
}