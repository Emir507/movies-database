import MainLayout from "../../components/MainLayout";
import ProtectedRoute from '../../components/ProtectedRoute';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  
}))

function Photo({ photo, user }) {
  const classes = useStyles();
  return (
    <MainLayout title='Photo'>
      <style jsx>{`
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      `}</style>
      <Grid xs={10} justify='center' className='m-auto'>
        <img src={photo.url} alt={`photo_${photo.id}`} />
      </Grid>
    </MainLayout>
  )
}

export async function getServerSideProps({ query }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${query.id}`);
  
  const photo = await response.json();

  return { props: { photo } }
}

export default ProtectedRoute(Photo);