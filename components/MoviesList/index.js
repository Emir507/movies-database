import { useState, useEffect } from 'react';
import MainLayout from '../MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import firebase from '../Firebase';
import 'firebase/database';

import { Grid } from '@material-ui/core';
function MoviesList({ movies, header = 'Movies' }) {
  const [ likedMovies, setLikedMovies ] = useState();
  const router = useRouter();

  useEffect(() => {
    const db = firebase.database();
    const ref = db.ref();
    let currentUserId;

    function getUser() {
      return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(authUser => {
          if (authUser) {
            currentUserId = authUser.uid;
            resolve();
          }
        })
      })
    }

    function getLikedMovies() {
      let movies;
      return new Promise(resolve => {
        ref.on('value', snap => {
          if (snap.val().users[currentUserId].favoriteMovies) {
            movies = snap.val().users[currentUserId].favoriteMovies;
            setLikedMovies(movies)
            resolve();
          }
        })
      })
    }

    async function loadData() {
      await getUser();
      await getLikedMovies();
    }

    loadData()
  }, [])

  function addToFavorite(favoriteMovieId, favoriteMovieName) {
    const db = firebase.database()
    const ref = db.ref();

    // текущий пользователь
    const currentUser = firebase.auth().currentUser.uid; // можно переделать через onAuthStateChanged
    let likedMovies = [];

    // проверка есть ли у текущего пользователя добавленные фильмы, если есть то присваивается массиву, если нет - действие пропускается
    ref.on('value', snapshot => {
      if (snapshot.val().users[currentUser].favoriteMovies) {
        likedMovies = snapshot.val().users[currentUser].favoriteMovies
        setLikedMovies(likedMovies);
      }
    })

    // проверка есть ли такой фильм в добавленных
    for (let elem of likedMovies) { 
      if (favoriteMovieId === elem.id && favoriteMovieName === elem.movie_name) {
        alert('Этот фильм уже есть в списке понравившихся')
        return
      }
    }

    // добавление фильма в список добавленных. в методе update должен быть объект
    db.ref(`/users/${currentUser}`).update({favoriteMovies: [ 
      ...likedMovies,
      {
        id: favoriteMovieId,
        movie_name: favoriteMovieName
      }
    ]})
  }
  return (
    <MainLayout>
      <div>
        <h1>{ header }</h1>
        <style jsx>{`
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
          li {
            position: inherit;
            transition: .4s;
          }
          li:hover {
            transform: scale(1.03);
          }

        `}</style>
        {/* <ul className="d-flex flex-wrap m-auto justify-content-center justify-content-md-start">
          {movies.map(movie => (
            <li key={movie.id} className='p-0 m-0 col-6 col-sm-5 col-md-4 col-lg-2 d-flex justify-content-center'>
                {router.pathname.includes('/genres') ? (
                  <GenresMovies router={router} movie={movie} addToFavorite={addToFavorite} />
                ) : (
                  <OtherMovies router={router} movie={movie} addToFavorite={addToFavorite} />
                )}
            </li>
          ))}
        </ul> */}

        <Grid container justify='center' spacing={1} >
          {movies.map(movie => (
            <Grid item key={movie.id}>
                {router.pathname.includes('/genres') ? (
                  <GenresMovies router={router} movie={movie} addToFavorite={addToFavorite} />
                ) : (
                  <OtherMovies router={router} movie={movie} addToFavorite={addToFavorite} />
                )}
            </Grid>
          ))}
        </Grid>
      </div>
    </MainLayout>
  )
}

const GenresMovies = ({ router, movie, addToFavorite }) => (
  <>
    <style jsx>{`
      .add-to-favorite {
        top:0;
        left: 0;
      }
    `}</style>
    <div className="position-relative">
      <Link href={`${router.route}/[movieId]`} as={`${router.asPath}/${movie.id}`}>
        <a>
          <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`poster_${movie.id}`} />
        </a>
      </Link>
      <button onClick={() => addToFavorite(movie.id, movie.title)} className="btn btn-success add-to-favorite position-absolute">
        +
      </button>
    </div>
  </>
)

const OtherMovies = ({ router, movie, addToFavorite }) => (
  <>
    <style jsx>{`
        .add-to-favorite {
          top:0;
          left: 0;
        }
      `}</style>
    <div className=" position-relative">
      <Link href={`${router.route}/[id]`} as={`${router.asPath}/${movie.id}`}>
        <a>
          <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`poster_${movie.id}`} />
        </a>
      </Link>
      {router.pathname.includes('/liked-movies') ? null : (
        <button onClick={() => addToFavorite(movie.id, movie.title)} className="btn btn-success add-to-favorite position-absolute">
          +
        </button>
      )}
    </div>
  </>
)

export default MoviesList;