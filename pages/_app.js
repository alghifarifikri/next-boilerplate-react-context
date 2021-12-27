import "../styles/globals.css";
import { StateProvider } from "../utils/context/store";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
