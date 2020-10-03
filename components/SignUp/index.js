import { useState, useEffect } from 'react';
import MainLayout from '../MainLayout';
import firebase from './../Firebase';
import 'firebase/database';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { SignInLink } from '../SignIn';

function SignUpPage() {
  const [ username, setUsername ] = useState('');
  const [ passwordOne, setPasswordOne ] = useState('');
  const [ passwordTwo, setPasswordTwo ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ error, setError ] = useState(null);

  const router = useRouter();


  function submit(e) {
    e.preventDefault();
    if (email !== '' && passwordOne !== '') {
      firebase.auth().createUserWithEmailAndPassword(email, passwordOne)
        .then((authUser) => {
          firebase.database()
            .ref(`/users/${authUser.user.uid}`)
            .set({
              username,
              password: passwordOne, 
              email,
            })
        })
        .then(() => router.push('/'))
        .catch(error => setError(error))
    }
  }

  const isValid = username === '' || email === '' || passwordOne === '' || passwordOne !== passwordTwo;
  // email, passwordOne passwordTwo username

  return (
    <>
      <h1>Sign up Page</h1>
      <form onSubmit={submit}>
        <input 
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          name="username"
          type='text' />

        <input 
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"  />

        <input 
          type="text"
          name="passwordOne"
          value={passwordOne}
          onChange={(e) => setPasswordOne(e.target.value)}
          placeholder="Your Password"  />

        <input 
          type="text"
          name="passwordTwo"
          value={passwordTwo}
          onChange={(e) => setPasswordTwo(e.target.value)}
          placeholder="Confirm Your Password"  />     
        
        <button disabled={isValid} type='submit'>show</button>

        {error ? <p>{error.message}</p> : null}
      </form>
    </>
  )
}

const SignUp = () => (
  <MainLayout title='Sign Up page'>
    <SignUpPage />
    <hr />
    <SignInLink />
  </MainLayout>
)

export const SignUpLink = () => (
  <p>
    <span>Don't have an account yet?</span> <span><Link href='/sign-up'><a>Sign Up</a></Link></span>
  </p>
)

export default SignUp;