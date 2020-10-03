import '../styles/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';
import 'firebase/database';
import withAuthent from '../components/Session/withAuthent';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

export default withAuthent(MyApp);
