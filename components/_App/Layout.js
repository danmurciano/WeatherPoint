import Head from "next/head";
import { Container } from "react-bootstrap";
import HeadContent from "./HeadContent";
import { useContext } from 'react';
import { AppContext } from './AppContext';


function Layout({ children }) {
  const { location } = useContext(AppContext);

  const metaText = location ? `${location.label} - Weather Forecast and Conditions` : `WeatherPoint - Daily Forecast, Hourly Forecast, Weather Conditions`

  return (
    <>
      <Head>
        <HeadContent />
        <title> {metaText} </title>
        <meta property="og:image" content="/public/images/weather-point.jpg" />
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
