import MainLayout from "../../components/MainLayout";
import ProtectedRoute from '../../components/ProtectedRoute';

function Users({ users }) {
  return (
    <MainLayout title='Users'>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </MainLayout>
  )
}


export async function getServerSideProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  const users = await response.json();

  return { props: { users } };
}
export default ProtectedRoute(Users);