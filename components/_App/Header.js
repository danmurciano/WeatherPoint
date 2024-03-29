import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Icon } from "semantic-ui-react";
import UnitSelect from "./UnitSelect";
import SearchBar from "./SearchBar";
import Favorites from "./Favorites";
import FavoritesSmall from "./FavoritesSmall";


function Header() {
  const router = useRouter();

  const smallScreen = isSmallScreen();

  function isSmallScreen() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (windowSize.width < 840) {
      return true;
    } else {
      return false;
    }
  }


  return (
    <div>
      <div class="row header">
        <div class="col-md-3 col-sm-12">
          <a href="/">
            <img class="logo" src="/images/logo8.png" />
          </a>
        </div>

        <div class="col-xl-6 col-lg-5 col-md-5 col-sm-12">
          <div class="search-div">
            <SearchBar />
          </div>
        </div>

        {router.pathname.startsWith("/location") ? (
          <div class="col col-units">
            <div>
              <UnitSelect smallScreen={smallScreen}/>
            </div>
          </div>
        ) : (
          <> </>
        )}
      </div>

      <div class="row favorites-row">
        {smallScreen ? (
          <FavoritesSmall />
        ) : (
          <Favorites />
        )}
      </div>
    </div>
  );
}

export default Header;
