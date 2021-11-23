import axios from 'axios'
import Cookies from 'universal-cookie'
import NavService from '@/services/Nav.service'

class TokenService {
  getToken() {
    const cookies = new Cookies()
    const token = cookies.get('token')

    return token
  }

  saveToken(token) {
    const cookies = new Cookies()
    cookies.set('token', token, { path: '/' })
    return Promise.resolve()
  }

  deleteToken() {
    const cookies = new Cookies()
    cookies.remove('token', { path: '/' })
    return
  }

  checkAuthToken(token) {
    return new Promise(async (resolve, reject) => {
      try {
        const API_URL =
          process.env.NODE_ENV === 'production'
            ? `https://${process.env.API_URL}/validate-token`
            : 'http://0.0.0.0:3000/validate-token'

        await axios.post(API_URL, { token })

        resolve(true)
      } catch (e) {
        resolve(false)
      }
    })
  }

  async authenticateTokenSsr(ctx) {
    const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null)
    const token = cookies.get('token')

    const response = await this.checkAuthToken(token)

    return response
  }

  async isTokenExists(ctx) {
    const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null)
    const token = cookies.get('token')

    const response = await this.checkAuthToken(token)

    if (response) {
      const navService = new NavService()
      navService.redirectUser('/dashboard', ctx, false)
    }
  }
}

export default TokenService
