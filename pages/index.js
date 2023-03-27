import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Background from "../components/Location/Background";
import Header from "../components/_App/Header";
import Footer from "../components/_App/Footer";
import weatherResponse from "../utils/weatherResponse";


export default function Home() {
  const [searchState, setSearchState] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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


  // Make initial handshake call to the API
  useEffect(async() => {
    const payload = { headers: { "X-Requested-With": "XMLHttpRequest" } };
    const weatherUrl = `https://proxy-1wq4.onrender.com/https://api.openweathermap.org/data/2.5/onecall?lat=51.5072&lon=-0.1275&units=imperial&appid=a27a7e6cb45357aa26387fcbdf4621cd`;
    const weatherResponse = await axios.get(weatherUrl, payload);
    return;
  })


  return (
      <div className={"page-index day-clear" + (loading ? " loading" : "")}>
      <Background conditions="01d"/>
      <Header setLoading={setLoading} />
      <div className="container-fluid home-image">
        <div>
          <img className="home-image-front" />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
