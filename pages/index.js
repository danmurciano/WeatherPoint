import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AppLoading from "../components/_App/AppLoading";
import { cities } from "../public/city-shortlist";
import Background from "../components/Location/Background";
import Header from "../components/_App/Header";
import Footer from "../components/_App/Footer";
import weatherResponse from "../utils/weatherResponse";
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import { AppContext } from '../components/_App/AppContext';


export default function Home() {
  const [searchState, setSearchState] = React.useState("");
  const { loading, setLoading, connected, setConnected } = useContext(AppContext);

  let search = searchState;
  const router = useRouter();

  function handleChange(event) {
    setSearchState(event.target.value);
  }

  function handleClearSearch(event) {
    search = "";
    setSearchState("");
    handleSubmit(event);
  }

  async function handleSubmit(event) {
    router.push(`/location?search=${search}`);
  }


  // Make initial call to the API
  useEffect(async() => {
    const url = `${baseUrl}/api/weather-handshake`;
    const response = await axios.get(url);
    setConnected(true);
  }, []);



  return (
    loading ? (
      <AppLoading connected={connected} />
    ) : (
      <div className={"page-index day-clear" + (loading ? " loading" : "")}>
      <Background conditions="01d"/>
      <Header />
      <div className="container-fluid home-image">
        <div>
          <img className="home-image-front" />
        </div>
      </div>
      <Footer/>
    </div>
    )
  );
}
