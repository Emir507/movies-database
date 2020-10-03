import MainLayout from '../../../components/MainLayout';
import firebase from '../../../components/Firebase';
import 'firebase/database';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MoviesList from '../../../components/MoviesList';

export default function LikedMovies() {
  const [ firebaseMovies, setFirebaseMovies ] = useState([]);
  const [ api_key, ] = useState('1330d97b1fc8cf61cfc0d7240d769521');
  const [ currentUser, setCurrentUser ] = useState('');

  const router = useRouter();
  useEffect(() => {
    let user;
    let usersFavoriteMovies = [];
    let moviesFromServer = []

    firebase.auth().onAuthStateChanged(authUser => { // редирект если не авторизован
      authUser 
        ? null
        : router.push('/sign-in')
    })

    // first promise to get user data
    function getUser() {
      return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(authUser => {
          if (authUser) {
            setCurrentUser(authUser)
            user = authUser.uid;
            resolve();
          }
        })
      })
    }

    // second promise to get data from the database using data that first promise generated
    function getData(currentUser) {
      return new Promise(resolve => {
        const ref = firebase.database().ref();

        ref.on('value', snap => {
          snap.val().users[currentUser].favoriteMovies 
            ? usersFavoriteMovies = snap.val().users[currentUser].favoriteMovies 
            : null
          resolve();
        })
      })
    }

    // function to fetch data using the data second promise generates
    async function loadData(id) {
      let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-EN`;

      const response = await fetch(url);

      const data = await response.json();

      moviesFromServer.push(data);
    }

    // function that awaits first and second promises
    async function getAllData() {
      await getUser()
      await getData(user).then(async () => {
        for ( let i = 0; i < usersFavoriteMovies.length; i++) {
          await loadData(usersFavoriteMovies[i].id)
        }
        setFirebaseMovies(moviesFromServer)
      })
    }

    getAllData();
  }, [])
  return (
    <MainLayout>
      <style jsx>{`
        ul {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
      `}</style>
      <MoviesList movies={firebaseMovies} header='My movies' />
    </MainLayout>
  )
}
