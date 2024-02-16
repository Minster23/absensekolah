import './App.css'
import Maps from './Components/Maps'
import Profile from './Components/Profile'
import LoginPage from './Components/LoginPage';
import { getInfo } from './Utils/SetLogin';
import { Notifications } from 'react-push-notification';
import React, { useEffect, useState } from 'react';

function App() {
  const Login = sessionStorage.getItem("_DataSaved")
  const [nama, kelas, status] = getInfo();
  if (status == true && Login) {
    return (
      <>
        <div className="gap-2 grid grid-cols-1 sm:grid-cols-2">
          <Notifications />
          <Profile Nama={nama} Kelas={kelas} />
          <Maps Absen={status} />
        </div>
      </>
    )
  } else if (Login == null || !Login) {
    return (
      <>
        <Notifications />
        <LoginPage />
      </>
    )
  }
}

export default App
