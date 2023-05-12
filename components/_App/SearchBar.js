import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from "next/router";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { Form, Input, Button, Icon } from "semantic-ui-react";
import { makeStyles } from '@material-ui/core/styles';
import { cityList } from "../../public/city-list";
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import { AppContext } from './AppContext';
import getLocationName from "../../utils/getLocationName";

const options = cityList;


const useStyles = makeStyles({
  option: {
    fontSize: 12,
    backgroundColor: "white",
    '& > span': {
      marginRight: 10,
      fontSize: 12,
    },
  },
});


export default function SearchBar() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const { connected, setLoading } = useContext(AppContext);

  const router = useRouter();


  const filterOptions = createFilterOptions({
    limit: 12,
    matchFrom: 'start'
  });


  function handleClearSearch(event) {
    setInputValue("");
  }


  async function handleSelect(event, newValue) {
    if (newValue) {
      let selectedLocation = getLocationName(newValue);
      if (!connected) setLoading("Establishing connection to weather API. Please be patient.");
 
      if (typeof(newValue) === "string") {
        if (newValue.length > 2) {
          try {
            const url = `${baseUrl}/api/searched-location`;
            const payload = {params: { search: newValue } };
            const geoResponse = await axios.get(url, payload);
            selectedLocation = getLocationName(geoResponse.data);
          } catch (error) {
            setLoading(error.response.data);
            return;
          }
        }
      }
      
      router.push(`/location/?search=${selectedLocation.queryString}`);
      setInputValue("");
    }
  }



  return (
    <>
      <div class="row search-bar">
        <Autocomplete
          onChange={(event, value) => {
            if(!value === null) {
              value = "";
            }
            handleSelect(event, value)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {setInputValue(newInputValue)}}
          id="controllable-states-demo"
          options={inputValue.length < 3 ? [] : options}
          getOptionLabel={inputValue.length < 3 ? option => "" : option => getLocationName(option).label}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Search City or Zip Code" variant="outlined" />}
          filterOptions={filterOptions}
          size="small"
          freeSolo
        />

        {inputValue.length > 0 ? (
          <Button
            size="small"
            className={inputValue.length > 0 ? "searchBarButton" : "hidden-button"}
            type="clear"
            icon="delete"
            onClick={handleClearSearch}
          />
        ) : (
          <Button
            size="small"
            className="searchBarButton"
            type="submit"
            icon="search"
          />
        )}
      </div>
    </>
  );
}
