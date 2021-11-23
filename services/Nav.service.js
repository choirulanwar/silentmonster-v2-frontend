import Router from 'next/router'

class NavService {
  async redirectUser(dest, ctx, redirectTo = false) {
    const res = ctx.res
    let targetUrl

    if (redirectTo) {
      targetUrl = `${dest}?redirectTo=${ctx.resolvedUrl}`
    } else {
      targetUrl = dest
    }

    if (res) {
      res.writeHead(302, { Location: targetUrl })
      res.end()
    } else {
      Router.push(targetUrl)
    }
  }
}

export default NavService
