import React, { Component } from 'react';
import { useRouter } from "next/router";
import { Menu, Button, Icon } from 'semantic-ui-react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import getLocationName from "../../utils/getLocationName";


export default function FavoritesSmall() {
  const [page, setPage] = React.useState(0);
  const router = useRouter();
  const cookies = parseCookies();


  let locations = [];
  let length;


  for (const [key, value] of Object.entries(cookies)) {
    if (key !== "currentLocation" && key !== "units") {
      locations.push(value);
      length = locations.length;
    }
  }


// Extends favorites cookies for 1 year everytime this element loads
  locations.map(location => (
    setCookie(null, getLocationName(location), location, {
      maxAge: 365 * 24 * 3600,
      path: '/',
    })
  ))


  async function handleSelect(event, value) {
    router.push(`/location/?search=${value}`);
  }



  function removeLocation(event, value) {
    destroyCookie(null, getLocationName(value));
    router.reload();
  }


  function scrollPage(event, value) {
    setPage(page + value);
  }


  function mapFavorites(locations) {
    length = locations.length;
    if (length > 2) {
      locations = locations.slice(page, page + 2);
    }

    return locations.map(location => (
      <Menu.Item className="favorites-menu-item-small">
        <Icon name="map marker" color="teal"/>
        <Button className="favorites-menu-button" onClick={() => handleSelect(event, location)}>
          <p className="favorites-city">{location.split(",")[0]} </p>
          <p className="favorites-regionAndCountry"> {getLocationName(location).split(" | ")[1]} </p>
        </Button>
        <Button size="mini" className="remove-button" onClick={() => removeLocation(event, location)}>
          <Icon name="trash alternate"/>
        </Button>
       </Menu.Item>
    ))
  }


  return (
    <div class="row favorites-menu">
      {locations.length > 0 ? (
      <>
      {page > 0 ? (
        <div class="arrow-col">
          <Button size="mini" className="arrow-button" basic active="false" onClick={() => scrollPage(event, -1)} >
            <Icon className="carousel-arrow" name="chevron left" size="big" />
          </Button>
        </div>
      ) : (
        <div class="arrow-col">
          <Button size="mini" className="arrow-button-disabled" basic active="false" >
            <Icon className="carousel-arrow" name="chevron left" size="big" />
          </Button>
        </div>
      )}

      <div class="favorites-locations">
        <Menu pagination inverted className="favorites-menu">
          {mapFavorites(locations)}
        </Menu>
      </div>

      {page < length - 2 ? (
        <div class="arrow-col">
          <Button size="mini" className="arrow-button" basic active="false" onClick={() => scrollPage(event, 1)} >
            <Icon className="carousel-arrow" name="chevron right" size="big" />
          </Button>
        </div>
      ) : (
        <div class="arrow-col">
          <Button size="mini" className="arrow-button-disabled" basic active="false" >
            <Icon className="carousel-arrow" name="chevron right" size="big" />
          </Button>
        </div>
      )}
      </>
    ) : (
      <> </>
    )}

    </div>
  )
}
