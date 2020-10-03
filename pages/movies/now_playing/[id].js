import MainLayout from '../../../components/MainLayout';
import SingleMovie from '../../../components/SingleMovie';
import ProtectedRoute from '../../../components/ProtectedRoute';

function NowPlayingMovie({ nowPLayingMovie }) {
  return (
    <MainLayout>
      <SingleMovie movie={nowPLayingMovie}/>
    </MainLayout>
  )
}


export async function getServerSideProps({ query }) {
  let api_key='1330d97b1fc8cf61cfc0d7240d769521';
  let url = `https://api.themoviedb.org/3/movie/${query.id}?api_key=${api_key}&language=en-EN`

  const response = await fetch(url);

  const nowPLayingMovie = await response.json();

  return { props: { nowPLayingMovie }}
}

export default ProtectedRoute(NowPlayingMovie)