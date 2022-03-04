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


class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    const { units } = parseCookies(ctx);
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (units) {
      pageProps.units = units;
    } else {
      pageProps.units = 0;
    }

    return { pageProps };
  }


  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}


export default MyApp
