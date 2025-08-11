'use client';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const OrderMap = ({ driverLocation, orders, pickup, delivery }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  // Center calculation
  let center = { lat: 6.9271, lng: 79.8612 }; 
  if (driverLocation) {
    center = driverLocation;
  } else if (pickup && delivery) {
    center = {
      lat: (pickup.lat + delivery.lat) / 2,
      lng: (pickup.lng + delivery.lng) / 2
    };
  }

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  return isLoaded ? (
    <div className="h-full w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        {/* Driver Marker */}
        {driverLocation && (
          <Marker 
            position={driverLocation} 
            label="D"
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }}
          />
        )}
        
        {/* Pickup Marker */}
        {pickup && (
          <Marker 
            position={pickup} 
            label="P"
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            }}
          />
        )}
        
        {/* Delivery Marker */}
        {delivery && (
          <Marker 
            position={delivery} 
            label="C"
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }}
          />
        )}
        
        {/* Markers for orders */}
        {orders && orders.map((order) => (
          order.pickupLocationCoords && (
            <Marker 
              key={order.id}
              position={order.pickupLocationCoords}
              label="R"
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
              }}
            />
          )
        ))}
      </GoogleMap>
    </div>
  ) : <div className="h-full bg-gray-200 flex items-center justify-center">Loading Map...</div>;


  


};

export default OrderMap;