import firebase from '../Firebase';

export default function SignOut() {
  function signOutHandle() {
    firebase.auth().signOut()
  }
  return(
    <>
      <button onClick={signOutHandle} className='btn btn-primary'>Sign Out</button>
    </>
  )
}