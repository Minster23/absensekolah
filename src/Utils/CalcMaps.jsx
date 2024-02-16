import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGeolocated } from "react-geolocated";

function getCoordinates() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  // Check if geolocation is not available or not enabled
  if (!isGeolocationAvailable) {
    console.log('Your browser does not support Geolocation');
    return { latitude: null, longitude: null };
  } else if (!isGeolocationEnabled) {
    console.log('Geolocation is not enabled');
    return { latitude: null, longitude: null };
  }

  // Check if coordinates are available
  if (coords) {
    const { latitude, longitude } = coords;
    return { latitude, longitude };
  } else {
    return { latitude: null, longitude: null };
  }
}

function DetectLocation(latitude, longitude) {
    const [isOnRadar, setIsOnRadar] = useState(Boolean);
    const [radar, setRadar] = useState(0);
    const [targetla, setTargetla] = useState(0);
    const [targetlo, setTargetlo] = useState(0);
    const [Absen, setAbsen] = useState(false);
  
  
    useEffect(() => {
      const interval = setInterval(() => {
        axios
          .post(`${import.meta.env.VITE_API}/detect-location`, { latitude, longitude })
          .then((response) => {
            const radarValue = response.data.radiusMeters;
            const isOnRadarValue = response.data.isOnRadar;
            setTargetla(response.data.centerLatitude);
            setTargetlo(response.data.centerLongitude);
            setRadar(radarValue);
            setIsOnRadar(isOnRadarValue);
            if(isOnRadar){
              setAbsen(true)
            }
          })
          .catch((error) => {
            console.error("Error detecting location:", error);
            // Handle errors
          });
      }, 1500); // Repeat every 1,2 seconds
  
      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
    }, [latitude, longitude, targetla, targetlo, Absen]); // Run the effect whenever latitude or longitude changes
  
    return { isOnRadar, radar, targetla, targetlo, Absen};
  }


export { getCoordinates , DetectLocation};
