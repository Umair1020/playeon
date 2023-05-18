import Layout from '../components/layout/Layout'
import '../styles/globals.scss';
import 'swiper/swiper.scss';
import '../styles/button-module.scss';
import '../styles/heroslide-module.scss';
import '../styles/modal-module.scss';
import '../styles/movielist-module.scss';
import { ThemeProvider } from '../utils/context/theme';
import { destroyCookie, parseCookies } from 'nookies';
import { redirectUser } from '../utils/authUser';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import 'react-toastify/dist/ReactToastify.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
// import 'video.js/dist/video-js.css';
// import '@videojs/themes/dist/fantasy/index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { AdvertismentDataProvider } from '../utils/context/adContext';
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {

  return (

    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>

  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {

  const today = new Date();


  const { token } = parseCookies(ctx);
  let pageProps = {};
  const noAccess = ctx.pathname === '/cantaccess';
  const protectedRoutes = ctx.pathname === "/home" || ctx.pathname === "/donate" || ctx.pathname === "/donate/[currentDonation]" ||
    ctx.pathname === "/explore" || ctx.pathname === "/feedback" || ctx.pathname === "/movies" || ctx.pathname === "/movies/[currentMovie]" ||
    ctx.pathname === "/profile/[username]" || ctx.pathname === "/request" || ctx.pathname === "/postId" ||  ctx.pathname === "/movieId" || ctx.pathname === "/series" || ctx.pathname === "/series/[currentSeries]" || ctx.pathname === "/series/[currentSeries]/[currentEpisode]" || ctx.pathname === "/giveaway" || ctx.pathname === "/browse/[search]" || ctx.pathname === "/contactus" || ctx.pathname === "/faq" || ctx.pathname === "/terms" || ctx.pathname === '/privacypolicy' || ctx.pathname === '/refundpolicy';


  if (!token) {
    (protectedRoutes || noAccess) && redirectUser(ctx, '/')
  } else { 
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    try {
      const res = await axios.get(`${baseUrl}/auth`, { headers: { Authorization: token } });
      const { user } = res.data;
      const isPaymentDue = today.toISOString() > user.nextPaymentDate;
      const isVoucherExpired = today.toISOString() > user.voucherExpiryDate;
      if (!user.isLoggedIn) {
        if (protectedRoutes || noAccess) {
          destroyCookie(ctx, 'token');
          redirectUser(ctx, '/');
        }
      }
      if (user.paymentMethod === "card") {
        if (isPaymentDue) {
          if (protectedRoutes || !noAccess) redirectUser(ctx, "/cantaccess");
        } else {
          if (!protectedRoutes || noAccess) redirectUser(ctx, "/home");
        }
      }

      if (user.paymentMethod === "voucher") {
        if (isVoucherExpired) {
          if (protectedRoutes || !noAccess) redirectUser(ctx, "/cantaccess");
        } else {
          if (!protectedRoutes || noAccess) redirectUser(ctx, "/home");
        }
      }

      pageProps.user = user;


    } catch (error) {
      destroyCookie(ctx, 'token');
      redirectUser(ctx, '/');
    }
  }
  return { pageProps };

}

export default MyApp



