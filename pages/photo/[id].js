import MainLayout from "../../components/MainLayout";
import ProtectedRoute from '../../components/ProtectedRoute';

function Photo({ photo, user }) {
  return (
    <MainLayout title='Photo'>
      <div className='d-flex justify-content-center'>
        <img src={photo.url} alt={`photo_${photo.id}`} />
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps({ query }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${query.id}`);
  
  const photo = await response.json();

  return { props: { photo } }
}

export default ProtectedRoute(Photo);