import '@styles/globals.css'
import 'keen-slider/keen-slider.min.css'

import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'next-themes'

import store from '@lib/store'
import { Head } from '@components/common'

const Noop = ({ children }: { children: React.ReactNode }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  const Layout = (Component as any).Layout || Noop

  return (
    <>
      <Head />
      <Provider store={store}>
        <ThemeProvider>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </>
  )
}
