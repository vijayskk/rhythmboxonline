import { RecoilRoot } from 'recoil'
import ChannelRefreshContext, { ChannelRefreshContextProvider } from '../contexts/ChannelRefreshContext';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return( <ChannelRefreshContextProvider 
  
  >
      <Component {...pageProps} />
    </ChannelRefreshContextProvider>
  );
}
export default MyApp
