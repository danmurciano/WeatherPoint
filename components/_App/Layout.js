import Head from "next/head";
import { Container } from "react-bootstrap";
import HeadContent from "./HeadContent";
// import Header from "./Header";


function Layout({ children }) {

  return (
    <>
      <Head>
        <HeadContent />
        <title>WeatherPoint</title>
      </Head>

      <div class="screen-adjust">
        <div class="wrapper">
          <Container fluid>
            {children}
          </Container>
        </div>
      </div>
    </>
  );
}

export default Layout;
