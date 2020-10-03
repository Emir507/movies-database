import MainLayout from "../../../components/MainLayout";
import Link from 'next/link';
import ProtectedRoute from '../../../components/ProtectedRoute';

function Movies({ genres }) {
  return (
    <MainLayout>
      <div>
        <h1>Genres</h1>
        <ul>
          {genres.map(genre => (
              <li key={genre.id}>
                <Link 
                  href='/movies/genres/[id]' 
                  as={`/movies/genres/${genre.id}`} >
                  <a>{genre.name}</a>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  let api_key='1330d97b1fc8cf61cfc0d7240d769521';
  let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-EN`;

  const response = await fetch(url)
  const genres = await response.json()

  return {
    props: {
      genres: genres.genres,
    }
  }
}

export default ProtectedRoute(Movies)