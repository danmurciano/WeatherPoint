import React, { useContext } from 'react';
import { useRouter } from "next/router";
import { Button, Icon, Popup } from 'semantic-ui-react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import getLocationName from "../../utils/getLocationName";
import { AppContext } from './AppContext';


export default function UnitSelect({ smallScreen }) {
  const router = useRouter();
  let cookies = parseCookies();

  const { units, setUnits, location } = useContext(AppContext);


  function saveLocation() {
    setCookie(null, location.label, location.queryString, {
      maxAge: 365 * 24 * 3600,
      path: '/',
    })
    router.reload();
  }


  async function handleSelect(event, value) {
    setUnits(value);
    setCookie(null, "units", value, {
      maxAge: 365 * 24 * 3600,
      path: '/',
    })
  }


  return (
    <div className="units-div">
      <Button.Group size="small" className="unit-buttons">
        <Button
          className={units === 0 ? "active-button" : "unit-button" }
          onClick={() => handleSelect(event, 0)}
        >
          {smallScreen ? String.fromCharCode(176) + "F" : String.fromCharCode(176) + "F, mph"}
        </Button>
        <div class="line"> </div>
        <Button
          className={units === 1 ? "active-button" : "unit-button" }
          onClick={() => handleSelect(event, 1)}
        >
          {smallScreen ? String.fromCharCode(176) + "C" : String.fromCharCode(176) + "C, kmh"}
        </Button>
      </Button.Group>

      <Popup
        className="save-popup"
        flowing
        basic
        inverted
        size="tiny"
        position="bottom"
        content= { <p>Save Current Location</p> }
        trigger= {
          <Button className="save-button" onClick={() => saveLocation()}>
            <Icon name="map marker"/>
            Save
          </Button>
        }
      />
    </div>
  );
}
