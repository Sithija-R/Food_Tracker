'use client';
import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const OrderMap = ({ pickupCoords, deliveryCoords }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);

  // Map container style
  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  // Center the map on the pickup location by default
  const center = pickupCoords || { lat: 0, lng: 0 };

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Calculate directions from current location to pickup to delivery
  const calculateDirections = () => {
    if (!currentLocation || !pickupCoords || !deliveryCoords) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: currentLocation,
        waypoints: [{ location: pickupCoords }],
        destination: deliveryCoords,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          setError('Directions request failed due to ' + status);
        }
      }
    );
  };

  // When current location changes, calculate directions
  useEffect(() => {
    if (currentLocation) {
      calculateDirections();
    }
  }, [currentLocation]);

  return (
    <div className="w-full">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={map => setMap(map)}
        >
          {/* Markers */}
          {pickupCoords && <Marker position={pickupCoords} label="P" />}
          {deliveryCoords && <Marker position={deliveryCoords} label="D" />}
          {currentLocation && <Marker position={currentLocation} label="You" />}

          {/* Directions */}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>

      <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          onClick={getCurrentLocation}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Find My Current Location
        </button>
        <button
          onClick={calculateDirections}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          disabled={!currentLocation}
        >
          Calculate Best Route
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default OrderMap;