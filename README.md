This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.


### Description
Weather Point is a React / Next.js based weather web app. It shows current, hourly and daily weather of a location.
A text field allows user to search for a location. User input is compared against a list of existing locations and auto suggest options.
A user can select a suggested option or otherwise ignore the suggestions and submit his own search value (city, zip code etc.).

Listed locations already have all the needed information, which redirects to a dynamically created url,
that pulls weather data from OpenWeatherMap API.

User free searched value also redirects to a dynamically created url, that first connects to MapQuest Geocoding API,
to search for the location and pulls its geographic information. Once that’s been achieved,
it proceeds the same to OpenWeatherMap, and pulls weather data.

Raw weather data is being processed by a specifically created function, that returns the data in a human readable form that is displayed on the page.
A toggle button allows the user to select between imperial and metric display of weather data.

A user can also save previously visited locations, so they would appear at the dedicated "Favorites" bar, and be easily accessible.
These locations are saved to the user’s browser as cookies. When a location is being visited, a cookie named “currentLocation”,
that holds the location info is created. Every time a new location is visited, it’s value is being replaced by that of the new location.
When a user selects the “Save Current” button, a new cookie with the location’s name is created,
and is assigned the value of the “currentLocation” cookie. This cookie will be good for a period of one year,
with every visit to the app restarting the count, so a user is reasonably likely to keep his saved locations intact,
so long he keeps using the app occasionally on the same browser.

As a side note, opening multiple tabs of the app with multiple locations could potentially mess up the process
of saving a location, as there’s only one “currentLocation” cookie, and its value always updates to the
most recently loaded location, meaning that an open tab of a previously loaded location will not save the location correctly,
once another location has been loaded on a different tab.
