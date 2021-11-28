import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { SignJWT, jwtVerify } from 'jose'
import { jsonResponse } from './utils'

export async function verifyAuth(request) {
  const token = request.cookies.token
  console.log('token', token)

  if (!token) {
    return NextResponse.redirect('/login')
    // return jsonResponse(401, { error: { message: 'Missing user token' } })
  }

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode('JWT_SECRET_KEY')
    )
    return verified.payload
  } catch (err) {
    return NextResponse.redirect('/login')
    // return jsonResponse(401, { error: { message: 'Your token has expired.' } })
  }
}

export async function setUserCookie(request, response) {
  const cookie = request.cookies.token

  if (!cookie) {
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode('JWT_SECRET_KEY'))
    response.cookie('token', token, { httpOnly: true })
  }

  return response
}
