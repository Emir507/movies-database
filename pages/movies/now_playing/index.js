import MainLayout from "../../../components/MainLayout";
import MoviesList from '../../../components/MoviesList';
import ProtectedRoute from '../../../components/ProtectedRoute';


function NowPlaying({ nowPlayingMovies }) {
  return (
    <MainLayout title='Now Playing'>
      <MoviesList movies={nowPlayingMovies} header="Now playing"/>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  let api_key = '1330d97b1fc8cf61cfc0d7240d769521';
  let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-EN`;
  const response = await fetch(url);

  const movies = await response.json();

  return { props: { nowPlayingMovies: movies.results }}
}

export default ProtectedRoute(NowPlaying)