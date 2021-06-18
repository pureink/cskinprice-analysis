import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <title>CSkin</title>
        <meta
          name="viewport"
          content="width=1500, user-scalable=yes"
          data-react-helmet="true"
        ></meta>
        <link href="https://unpkg.com/pattern.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
