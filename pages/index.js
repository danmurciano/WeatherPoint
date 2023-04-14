import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AppLoading from "../components/_App/AppLoading";
import { cities } from "../public/city-shortlist";


export default function Home() {
  const router = useRouter();

  // Make initial call to the API with random location
  useEffect(async() => {
    let index = Math.floor(Math.random() * cities.length);
    let randomCity = cities[index];
    let city = Object.values(randomCity)
    city.join();
    router.push(`/location?search=${city}`);
  }, []);


  return (
    <AppLoading />
  );
}
