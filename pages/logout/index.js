import { useEffect, Fragment } from 'react'
import Router from 'next/router'

import { useAuthContext } from '@/services/Auth.service'
import TokenService from '@/services/Token.service'

const Logout = () => {
  const tokenService = new TokenService()
  const [authState, authDispatch] = useAuthContext()

  useEffect(() => {
    authDispatch({
      type: 'removeAuthDetails'
    })

    tokenService.deleteToken()

    setTimeout(() => {
      Router.push('/login')
    }, 3000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Fragment>You will be automatically redirected in 3 second</Fragment>
}

export default Logout
