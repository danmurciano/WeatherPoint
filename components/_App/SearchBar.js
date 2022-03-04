import React from 'react';
import { useRouter } from "next/router";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { Form, Input, Button, Icon } from "semantic-ui-react";
import { makeStyles } from '@material-ui/core/styles';
import { cityList } from "../../public/city-list";
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import NProgress from "nprogress";


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
  const [inputValue, setInputValue] = React.useState("");

  const router = useRouter();


  const filterOptions = createFilterOptions({
    limit: 12,
    matchFrom: 'start'
  });


  function handleClearSearch(event) {
    setInputValue("");
  }


  async function handleSearch(event) {
    if (inputValue.length > 1) {
      router.push(`/location/?search=${inputValue}`);
      setInputValue("");
    }
  }


  async function handleSelect(event, newValue) {
    if (newValue) {
      if (typeof(newValue) === "string") {
        NProgress.start();
        router.push(`/searched-location/?search=${inputValue}`);
        NProgress.done();
      } else if (typeof(newValue) === "object") {
        let selectedLocation = Object.values(newValue)
        selectedLocation.join();
        NProgress.start();
        router.push(`/location/?search=${selectedLocation}`);
        NProgress.done();
      }
      setInputValue("");
    }
  }

  function getLocationLabel(location) {
    if (location.region !== "" && location.region !== location.city) {
      return location.city + ", " + location.region + ", " + location.country;
    } else {
      return location.city + ", " + location.country;
    }
  }


  return (
    <div class="row search-bar">
      <Autocomplete
        onChange={(event, newValue) => {handleSelect(event, newValue)}}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {setInputValue(newInputValue)}}
        id="controllable-states-demo"
        options={inputValue.length < 3 ? [] : options}
        getOptionLabel={inputValue.length < 3 ? option => "" : option => getLocationLabel(option)}
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
          onClick={handleSearch}
        />
      )}
    </div>
  );
}
