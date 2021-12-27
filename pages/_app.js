/*Components*/
import Layout from "../Components/Layout/Layout";
/*CSS*/
import "./globals.scss";

/*Point d'entrée de l'application*/
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
