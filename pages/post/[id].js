import MainLayout from "../../components/MainLayout";
import Link from 'next/link';
import styles from '../../styles/post.module.scss';
import { Card } from 'react-bootstrap'; 
import ProtectedRoute from '../../components/ProtectedRoute';

function Post({ post }) {
  return (
    <MainLayout title='Post Page'>
      <Card body style={{ width: '40%' }} className='m-auto'>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.body}</Card.Text>
        <Link scroll={false} href='/posts'>
          <a>Back to all posts</a>
        </Link>
      </Card>
    </MainLayout>
  )
}

export async function getServerSideProps({ query }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${query.id}`);

  const post = await response.json();

  return { props: { post } }
}

export default ProtectedRoute(Post);