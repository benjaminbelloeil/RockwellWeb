import { SessionProvider } from "next-auth/react"
import "../styles/globals.css";


export default function App({ Component, pageProps }) {
  return (
  <Component {...pageProps} />,
  <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
  </SessionProvider>
  )

}