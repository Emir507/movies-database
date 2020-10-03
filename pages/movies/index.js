import MainLayout from "../../components/MainLayout";
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';

function Movies() {
  return (
    <MainLayout title='Movies'>
      <div>
        <h1>Movies</h1>
        <ul>
          <li>
            <Link href='/movies/genres'>
              <a>Genres</a>
            </Link>
          </li>
          <li>
            <Link href='/movies/popular'>
              <a>Popular</a>
            </Link>
          </li>
          <li>
            <Link href='/movies/now_playing'>
              <a>Now Playing</a>
            </Link>
          </li>
        </ul>
      </div>
    </MainLayout>
  )
}

export default ProtectedRoute(Movies)