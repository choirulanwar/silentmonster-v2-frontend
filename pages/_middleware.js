import { NextResponse } from 'next/server'
import jwt from '@tsndr/cloudflare-worker-jwt'

export default async function middleware(req) {
  const pathname = req.nextUrl.pathname.replace('/favicon.ico')
  const { token } = req.cookies

  let isValidToken
  try {
    isValidToken = await jwt.verify(token, '["=R{f6BzbU-W3hm')
  } catch (e) {
    isValidToken = false
  }

  const authPages = [
    '/login',
    '/register',
    '/confirm-mail',
    '/resend-mail',
    '/forgot-password',
    '/reset-password'
  ]

  if (pathname !== 'undefined') {
    if (authPages.includes(pathname)) {
      if (isValidToken) {
        return NextResponse.redirect('/dashboard')
      }
    } else {
      if (!isValidToken) {
        return NextResponse.redirect('/login')
      }
    }
  }
}
