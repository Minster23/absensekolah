import React, { useEffect, useState } from 'react'
import axios from 'axios';
import notification from './notfiication';

export let Status = '';
function setAbsenLoc(absen) {
  if (sessionStorage.getItem('_DataSaved') == 'true') {
    const encryptedUsername = sessionStorage.getItem("_Data1");
    console.log('absen', absen)
    axios.post(`${import.meta.env.VITE_API}/absen`, { encryptedUsername, absen })
      .then((response) => {
        Status = (response.data.Status);
      })
      .catch((error) => {
        console.error("Error fetching nama", error);
        // Handle errors
      });
  }
}

function respondAbsen() {
  const [absenStatus, setAbsen] = useState('')
  if (sessionStorage.getItem('_DataSaved') == 'true') {
    useEffect(() => {
      const interval = setInterval(() => {
        setAbsen(Status)
      }, 1800);

      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])
    notification({ title: 'Absen', sbtl: '', msg: 'Berhasil absen' });
    return { absenStatus }
  }
}


export { setAbsenLoc, respondAbsen }