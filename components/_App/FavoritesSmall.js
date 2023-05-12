import React, { Component, useState, useContext } from 'react';
import { useRouter } from "next/router";
import { Menu, Button, Icon } from 'semantic-ui-react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { AppContext } from './AppContext';


export default function FavoritesSmall() {
  const { connected, loading, setLoading } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const router = useRouter();
  const cookies = parseCookies();
  

  let locations = [];
  let length;

  for (const [key, value] of Object.entries(cookies)) {
    if (key !== "units") {    
      let location = {
        label: key,
        city: key.split(",")[0],
        regionAndCountry: key.split(",")[1],
        queryString: value
      }
      locations.push(location);
      length = locations.length;
    }
  }


// Extends favorites cookies for 1 year everytime this element loads
  locations.map(location => (
    setCookie(null, location.label, location.queryString, {
      maxAge: 365 * 24 * 3600,
      path: '/',
    })
  ))
 

  async function handleSelect(value) {
    router.push(`/location?search=${value}`);
  }


  function removeLocation(location) {
    destroyCookie(null, location.label);
    router.reload();
  }


  function scrollPage(value) {
    setPage(page + value);
  }


  function mapFavorites(locations) {
    length = locations.length;
    if (length > 2) {
      locations = locations.slice(page, page + 2);
    }

    return locations.map(location => (
      <Menu.Item className="favorites-menu-item-small">
        <Icon name="map marker"/>
        <Button className="favorites-menu-button" onClick={() => handleSelect(location.queryString)}>
          <p className="favorites-city"> {location.city} </p>
          <p className="favorites-regionAndCountry"> {location.regionAndCountry} </p>
        </Button>
        <Button size="mini" className="remove-button" onClick={() => removeLocation(location)}>
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
            <Button size="mini" className="arrow-button" basic active="false" onClick={() => scrollPage(-1)} >
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
            <Button size="mini" className="arrow-button" basic active="false" onClick={() => scrollPage(1)} >
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
