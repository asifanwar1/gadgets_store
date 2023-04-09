import '@/styles/globals.css'
import MainNavbar from 'components/MainNavbar'
// import { SessionProvider } from "next-auth/react"
import { SessionProvider } from 'next-auth/react';

// export default function App({ Component, pageProps }) {
//   return (
//     <>
//       <MainNavbar/>
//       <Component {...pageProps} />
//     </>
// )}
export default function App({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        {/* <MainNavbar/> */}
        <Component {...pageProps} />
      </SessionProvider>
    </>
)}
