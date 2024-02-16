import React,{useEffect, useState} from "react";
import { Card, CardFooter, Button } from "@nextui-org/react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from "react-leaflet";
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { getCoordinates , DetectLocation} from "../Utils/CalcMaps";
import {setAbsenLoc, respondAbsen} from "../Utils/setAbsen";

export default function Maps() {
  const { latitude, longitude } = getCoordinates();
  const position = [-6.030084, 106.0693773];
  const [Absen, setAbsen] = useState(false);
  const { isOnRadar, radar, targetla, targetlo } = DetectLocation(latitude, longitude);
  const userPos = latitude !== null && longitude !== null ? [latitude, longitude] : [targetla, targetlo];
  const { absenStatus } = respondAbsen();
  
  const Outside = { color: 'blue' };
  const Inside = { color: 'green' };
  const limeOptions = { color: 'red' };
  
  const polyline = [position, userPos];
  
  useEffect(() => {
    const absenInterval = setInterval(() => {
      setAbsenLoc(Absen);
    }, 1500);
  
    const radarInterval = setInterval(() => {
      setAbsen(isOnRadar);
    }, 1800);
  
    return () => {
      clearInterval(absenInterval);
      clearInterval(radarInterval);
    };
  }, [Absen, isOnRadar]);
  
  console.log(absenStatus);
  

  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none"
      style={{ position: "relative" }}
    >
      <div style={{ height: "300px", width: "100%", zIndex: 1 }}>
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {Absen ?
            (
              <CircleMarker center={position} pathOptions={Inside} radius={radar / 20}>
                <Popup>Ayo absen</Popup>
              </CircleMarker>
            ) :
            (
              <CircleMarker center={position} pathOptions={Outside} radius={radar / 20}>
                <Popup>Belum masuk area</Popup>
              </CircleMarker>
            )}
          <Polyline pathOptions={limeOptions} positions={polyline}/>
          <Marker position={[targetla, targetlo]}>
            <Popup><p>Sekolah</p></Popup>
          </Marker>
          <Marker position={userPos}>
            <Popup><p>Kamu</p></Popup>
          </Marker>
        </MapContainer>
      </div>

      {absenStatus == 'Masuk' ? (
        <CardFooter
          style={{ zIndex: 10 }}
          className="justify-between before:bg-green/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1"
        >
          <p className="text-tiny text-white/80">Absen terkonfirmasi</p>
        </CardFooter>
      )
        :
        (
          <CardFooter
            style={{ zIndex: 10 }}
            className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1"
          >
            <p className="text-tiny text-white/80">Konfirmasi absen</p>
            {Absen ? (
              <Button
                className="text-tiny text-white bg-black/60"
                variant="flat"
                color="success"
                radius="lg"
                size="sm"
                onClick={setAbsenLoc(Absen)}
              >
                absen
              </Button>
            ) : (
              <Button
                isDisabled
                className="text-tiny text-white bg-black/20" // Default button
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                Belum bisa
              </Button>
            )}
          </CardFooter>
        )}

    </Card>
  );
}
