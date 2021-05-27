import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp