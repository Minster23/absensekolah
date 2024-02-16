import axios from 'axios';
import React,{ useEffect, useState } from 'react';

async function verifyCredentials() {
  try {
    const encryptedUsername = sessionStorage.getItem("_Data1");
    const encryptedPassword = sessionStorage.getItem("_Data2");
    if (!encryptedUsername || !encryptedPassword) {
      console.error('Encrypted credentials not found in sessionStorage');
      return;
    }

    const response = await axios.post(`${import.meta.env.VITE_API}/verify`, { encryptedUsername, encryptedPassword });
    if (response.status === 200 && response.data.isLogin === true) {
      console.log('User is authenticated');
      sessionStorage.setItem("_DataSaved", response.data.isLogin);
      window.location.reload();
      // Redirect to the authenticated page or perform other actions
    } else {
      console.log('User authentication failed');
      window.location.reload();
      // Handle authentication failure, such as displaying an error message to the user
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle error, such as displaying an error message to the user
  }
}

function getInfo() {
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState(0);
  const [status, setstatus] = useState('');
  const [fetched, setFetched] = useState(false);
  if(sessionStorage.getItem('_DataSaved') == 'true'){
    useEffect(() => {
      if (!fetched) {
        const encryptedUsername = sessionStorage.getItem("_Data1");
        const encryptedPassword = sessionStorage.getItem("_Data2");
        
        axios.post(`${import.meta.env.VITE_API}/getInfo`, { encryptedUsername, encryptedPassword })
          .then((response) => {
            setNama(response.data.nama);
            setKelas(response.data.kelas)
            setstatus(response.data.isLogin)
            setFetched(true);
          })
          .catch((error) => {
            console.error("Error fetching nama", error);
            // Handle errors
          });
      }
    }, [fetched]); // Run effect only when fetched changes
    return [nama, kelas, status];
  }else{
    return [nama, kelas, status];
  }
}

export {verifyCredentials, getInfo};
