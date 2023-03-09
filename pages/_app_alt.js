import App from "next/app";
import React, { useState } from "react";
import Layout from "../components/_App/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import "../styles/nprogress.css";
import '../styles/globals.css';
import '../styles/styles.css';
import '../styles/stars.css';
import '../styles/clouds.css';
import '../styles/rain.css';
import '../styles/snow.css';
import { parseCookies, setCookie, destroyCookie } from 'nookies';


destroyCookie(null, 'currentLocation');


export default function MyApp({ Component, pageProps }) {

  async function getInitialProps({ Component, ctx }) {
    const { units } = parseCookies(ctx);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // if (units) {
    //   pageProps.units = units;
    // } else {
    //   pageProps.units = 0;
    // }

  }

  // const [loading, setLoading] = React.useState(false);
  // console.log(loading, setLoading);
  // pageProps.loading = loading;
  // pageProps.setLoading = setLoading;


  // const ctx = React.createContext({loading});

    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
}

