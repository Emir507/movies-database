import MainLayout from "../../../components/MainLayout";
import SingleMovie from "../../../components/SingleMovie";
import firebase from '../../../components/Firebase';
import { useEffect } from 'react';

export default function LikedMovie({ likedMovie }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(authUser => 
      authUser
        ? null
        : router.push('/sign-in')  
    )
  }, [])
  return (
    <MainLayout>
      <SingleMovie movie={likedMovie}/>
    </MainLayout>
  )
}


export async function getServerSideProps({ query }) {
  let api_key='1330d97b1fc8cf61cfc0d7240d769521';
  let url = `https://api.themoviedb.org/3/movie/${query.id}?api_key=${api_key}&language=en-EN`

  const response = await fetch(url);

  const likedMovie = await response.json();

  return { props: { likedMovie }}
}