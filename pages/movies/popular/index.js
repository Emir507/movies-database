import MainLayout from "../../../components/MainLayout";
import MoviesList from '../../../components/MoviesList';
import ProtectedRoute from '../../../components/ProtectedRoute';

function Popular({ popularMovies }) {
  return (
    <MainLayout title='Popular'>
      <MoviesList movies={popularMovies} header="Popular Movies" />
    </MainLayout>
  )
}

export async function getServerSideProps() {
  let api_key = '1330d97b1fc8cf61cfc0d7240d769521';
  let url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-EN`;
  const response = await fetch(url);

  const movies = await response.json();

  return { props: { popularMovies: movies.results }}
}

export default ProtectedRoute(Popular)