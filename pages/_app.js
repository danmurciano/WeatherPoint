import App from "next/app";
import React from "react";
import Layout from "../components/_App/Layout";
import { AppProvider, AppContext } from "../components/_App/AppContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import "../styles/nprogress.css";
import '../styles/globals.css';
import '../styles/styles.css';
import '../styles/stars.css';
import '../styles/clouds.css';
import '../styles/rain.css';
import '../styles/snow.css';


export default function MyApp({ Component, pageProps }) {  
  return (
    <AppProvider>
        <Layout {...pageProps}>
           <Component {...pageProps} />
        </Layout>
    </AppProvider>
  )
}

