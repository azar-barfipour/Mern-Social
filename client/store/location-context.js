import react, { createContext } from "react";

const LocationContext = createContext({
  address: "",
  lat: "",
  lng: "",
});

export const LocationContextProvider = ({ lat, lng, address, children }) => {
  const locationInfo = {
    address,
    lat,
    lng,
  };
  return (
    <LocationContext.Provider value={locationInfo}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
