"use client";

import { useState} from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
//custom marker icon
import L from "leaflet";


const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const CrimeLocation = ({onLocationSelect}) => {
  
  const [crimeData, setCrimeData] = useState({ latitude: null, longitude: null });
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
  const [markerPosition, setMarkerPosition] = useState([20.5937, 78.9629]);

 //-------To get the current location of the user-------------
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      //takes two callback functions:--success callback & error callback
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter([latitude, longitude]);
        //moves marker to user's location
        setMarkerPosition([latitude, longitude]); 
        //stores latitude & longitude
        setCrimeData({ latitude, longitude });
        //Passes the location to the parent component --->
        onLocationSelect(latitude, longitude);
      },
      (error) => {
        alert('Error while fetching User Location',error);
      }
    );
  };
  
  //----------------------clickable and Draggable Marker------------------
  function DraggableMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]); // Update marker position on click
        setCrimeData({ latitude: lat, longitude: lng });
        onLocationSelect(lat, lng);
      },
    });

    return (
     
      <Marker
        position={markerPosition}
        icon={customIcon}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const { lat, lng } = e.target.getLatLng();
            setMarkerPosition([lat, lng]); // Update marker position after drag
            setCrimeData({ latitude: lat, longitude: lng });
            onLocationSelect(lat,lng);
          }
        }}
      />
    );
  }

  
  return (
    <>
    <div className="p-2 border rounded-lg shadow-md w-full h-[90vh] justify-center items-center mb-4 ">
      <div className="mb-4 space-y-2">
        <button
          type="button"
          onClick={handleGetLocation}
          className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600"
        >
          Get My Location
        </button>
      </div>
     {/**Uses OpenStreetMap tiles as the map background. */}

      <div className="h-[65vh] mb-1  w-full h-[109vh]justify-center items-center ">
        <MapContainer center={mapCenter} zoom={15} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <DraggableMarker />
        </MapContainer>
      </div>
      </div>
      {crimeData.latitude && crimeData.longitude && (
        <p className="text-lg text-gray-600 font-semibold p-1">
          Selected Location:<br></br>
         
          Latitude: {crimeData.latitude.toFixed(4)},
          Longitude:{crimeData.longitude.toFixed(4)}
        </p>
      )}
    
    
    <br></br>

    </>
  );
};

export default CrimeLocation;
