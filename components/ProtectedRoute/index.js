import { useEffect, useState } from 'react';
import firebase from '../Firebase';
import { useRouter } from 'next/router';

const ProtectedRoute = Component => props => {
  const [authUser , setAuthUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(authUser => 
      authUser 
        ? setAuthUser(authUser)
        : router.push('/')
    )
  } ,[])

  return (
    <Component authUser={authUser} {...props} />
  )
}

export default ProtectedRoute;