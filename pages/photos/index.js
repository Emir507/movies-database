import MainLayout from "../../components/MainLayout";
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';

function Photos({ photos }) {
  return (
    <MainLayout title='Photos'>
      <style jsx>{`
        .photos {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          grid-gap: 10px;
        }

        div img {
          width: 100%;
          height: 100%;
          display: block;
        }
      `}</style>
      <div className="photos w-50 m-auto">
        {photos.map(photo => (
          <div key={photo.id}>
            <Link href="/photo/[id]" as={`/photo/${photo.id}`}>
              <a>
                <img src={photo.thumbnailUrl} alt={`photo__${photo.id}`}/>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=27')
  
  const photos = await response.json();

  return { props: { photos }}
}


export default ProtectedRoute(Photos)