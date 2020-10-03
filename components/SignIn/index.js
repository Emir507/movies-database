import { useState, useEffect } from 'react';
import firebase from '../Firebase';
import { useRouter } from 'next/router';
import { SignUpLink } from '../SignUp';
import MainLayout from '../MainLayout';
import Link from 'next/link';

function SignInPage() {
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(authUser => 
      authUser 
      ? router.push('/')  
      : null
    )
  }, [])
  function submit(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => router.push('/'));
  }

  return (
    <>
      <h1>Sign in Page</h1>
      <form onSubmit={submit}>
        <input 
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="Your Email" />
          
        <input
          value={password}
          onChange={e => setPassword(e.target.value)} 
          type="text"
          placeholder="Your Password" />
        
        <button type='submit'>Sign In</button>
      </form>
    </>
  )
}

const SignIn = () => (
  <MainLayout>
    <SignInPage />
    <hr />
    <SignUpLink />
  </MainLayout>
)

export const SignInLink = () => (
  <p>
    Have an account?
    <Link href="/sign-in">
      <a>Sign In!</a>
    </Link>
  </p>
)

export default SignIn;