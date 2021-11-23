import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@/libs/apolloClient'
import { AuthProvider } from '@/services/Auth.service'
import { MantineProvider, NormalizeCSS, GlobalStyles } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { ToastContainer } from 'react-toastify'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'
import '../styles/sidebar/styles.scss'

export default function App(props) {
  const { Component, pageProps } = props
  const apolloClient = useApollo(pageProps)

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
              <Component {...pageProps} />
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
