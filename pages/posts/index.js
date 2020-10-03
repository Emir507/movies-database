import { useState } from 'react';
import MainLayout from "../../components/MainLayout";
import Link from 'next/link';
import styles from '../../styles/posts.module.scss';
import ProtectedRoute from '../../components/ProtectedRoute';

function Posts({ posts: serverPosts }) {
  const [posts, ] = useState(serverPosts);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, ] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
  };

  return (
      <MainLayout title='Posts Page'>
        <div className={styles.posts}>
          <ul className={styles.list}>
            {currentPosts.map(post => (
              <li className={styles.item} key={post.id}>
                <Link href={`/post/[id]`} as={`/post/${post.id}`} >
                  <a>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* <Pagination 
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage} /> */}
      </MainLayout>
  )
}

export async function getServerSideProps() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

  const posts = await response.json();

  return { 
    props: { 
      posts, 
    } 
  }
}

export default ProtectedRoute(Posts)