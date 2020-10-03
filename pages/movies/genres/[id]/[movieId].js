import MainLayout from "../../../../components/MainLayout";
import SingleMovie from '../../../../components/SingleMovie';
import ProtectedRoute from '../../../../components/ProtectedRoute';


function MovieByGenre({ movieByGenre }) {
  return (
    <MainLayout>
      <SingleMovie movie={movieByGenre}/>
    </MainLayout>
  )
}

export async function getServerSideProps({ query }) {
  let api_key='1330d97b1fc8cf61cfc0d7240d769521';
  let url = `https://api.themoviedb.org/3/movie/${query.movieId}?api_key=${api_key}&language=en-EN`;
  const response = await fetch(url);

  const movieByGenre = await response.json();

  return { props: { movieByGenre }}
}

export default ProtectedRoute(MovieByGenre);