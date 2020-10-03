import { useRouter } from 'next/router';
import MainLayout from '../../../../components/MainLayout';
import MoviesList from '../../../../components/MoviesList';
import ProtectedRoute from '../../../../components/ProtectedRoute';

function Genre({ moviesByGenre }) {
  return (
    <MainLayout>
      <MoviesList movies={ moviesByGenre } header='Movies by genre'/>
    </MainLayout>
  )
}
let pageNumber = 1;
export async function getServerSideProps({ query }) {
  let api_key='1330d97b1fc8cf61cfc0d7240d769521';
  let url = `https://api.themoviedb.org/3/discover/movie/?api_key=${api_key}&language=en-EN&with_genres=${query.id}&page=${pageNumber}`;

  const response = await fetch(url)
  const genre = await response.json()
  
  return { props: { moviesByGenre: genre.results } }
}

export default ProtectedRoute(Genre);