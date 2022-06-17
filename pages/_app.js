import { RecoilRoot } from 'recoil'
import ChannelRefreshContext, { ChannelRefreshContextProvider } from '../contexts/ChannelRefreshContext';
import { PlayerContextProvider } from '../contexts/PlayerContext';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (<ChannelRefreshContextProvider

  >
    <PlayerContextProvider>
      <Component {...pageProps} />

    </PlayerContextProvider>
  </ChannelRefreshContextProvider>
  );
}
export default MyApp
