import MainLayout from "../../components/MainLayout";
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';

function Account({ authUser }) {
  return (
    <>
      {authUser ? (
        <MainLayout>
          <h1>{authUser.email}</h1>
          <Link href="/account/liked-movies">
            <a>my movies</a>
          </Link>
        </MainLayout>
      ) : null}
    </>
  )
}

export default ProtectedRoute(Account);