import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Background from "../components/Location/Background";
import Header from "../components/_App/Header";
import Footer from "../components/_App/Footer";
import weatherResponse from "../utils/weatherResponse";


export default function Home() {
  const [searchState, setSearchState] = React.useState("");
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


  return (
<<<<<<< HEAD
    <div class="page-index day-clear">
      <Background conditions="01d"/>
=======
    <div class="page-index">
>>>>>>> 18ed7287fd83b1a8a4c3858637f926b08ce23635
      <Header/>
      <div class="container-fluid home-image">
        <div>
          <img class="home-image-front" />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
