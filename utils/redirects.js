import TokenService from '@/services/Token.service'

export const adminSSP = async ctx => {
  const tokenService = new TokenService()
  const isValidToken = await tokenService.authenticateTokenSsr(ctx)

  if (!isValidToken) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      },
      props: {}
    }
  } else {
    return {
      props: {
        ...ctx.params,
        page: parseInt(ctx?.query?.page) || 1
      }
    }
  }
}

export const authSSP = async ctx => {
  const tokenService = new TokenService()
  const isValidToken = await tokenService.authenticateTokenSsr(ctx)

  if (isValidToken) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard'
      },
      props: {}
    }
  } else {
    return {
      props: {}
    }
  }
}
