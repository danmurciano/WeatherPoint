import { createContext, useState, useEffect } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const savedUnits = parseCookies().units;
  
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [units, setUnits] = useState(savedUnits ? savedUnits : 0);
  const [location, setLocation] = useState("");

  return (
    <AppContext.Provider value={{ loading, setLoading, connected, setConnected, units, setUnits, location, setLocation }}>
      {children}
    </AppContext.Provider>
  );
};
