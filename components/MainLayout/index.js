import Head from "next/head";
import { useRouter } from 'next/router';
import NavComponent from '../Nav';

export default function MainLayout({ children, title = 'Movies App'}) {
  const router = useRouter();
  return (
    <>
    <Head>
      <title>{title} | Next App</title>
    </Head>
    <NavComponent />
    <style jsx>{`
      main {
        margin-top: 70px;
      }
    `}</style>
    <main>
      { children }
    </main>
    </>
  )
}
