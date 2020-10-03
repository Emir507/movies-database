import MainLayout from "../../components/MainLayout";
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import firebase from './../../components/Firebase';

function Account({ authUser }) {
  // const router = useRouter();
  // const [ authUser, setAuthUser ] = useState({});
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(authUser => 
  //     authUser 
  //       ? setAuthUser(authUser)
  //       : router.push('/sign-in')
  //   )
  // }, []) 
  return (
    <>
      {authUser ? (
        <MainLayout>
          <h1>{authUser.email}</h1>
          <Link href="/account/liked-movies">
            <a>my movies</a>
          </Link>
        </MainLayout>
      ) : null}
    </>
  )
}

export default ProtectedRoute(Account);