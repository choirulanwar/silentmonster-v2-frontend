import { useRouter } from 'next/router'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@/libs/apolloClient'
import { AuthProvider } from '@/services/Auth.service'
import { MantineProvider, NormalizeCSS, GlobalStyles } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { ToastContainer } from 'react-toastify'
import NextNProgress from 'nextjs-progressbar'

import 'react-toastify/dist/ReactToastify.min.css'
import '@/styles/sidebar/styles.scss'
import '@/styles/globals.css'

export default function App(props) {
  const router = useRouter()
  const pageParams = {
    ...router.query,
    page: parseInt(router.query?.page || 1)
  }
  const { Component, pageProps } = props
  const globalProps = { ...pageProps, ...pageParams }
  const apolloClient = useApollo(globalProps)

  return (
    <>
      <MantineProvider
        theme={{
          colorScheme: 'light'
        }}
      >
        <NormalizeCSS />
        <GlobalStyles />
        <NotificationsProvider>
          <ApolloProvider client={apolloClient}>
            <AuthProvider>
              <NextNProgress />
              <Component {...globalProps} />
              <ToastContainer
                position="bottom-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
              />
            </AuthProvider>
          </ApolloProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  )
}
