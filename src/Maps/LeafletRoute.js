import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './LeafletRoute.css'; // Import the external CSS file

const LeafletRoute = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [routeControl, setRouteControl] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const DefaultIcon = L.icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance.current);

      mapInstance.current.zoomControl.setPosition('topleft');

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const location = [position.coords.latitude, position.coords.longitude];
            setUserLocation(location);

            mapInstance.current.setView(location, 13);
            L.marker(location)
              .addTo(mapInstance.current)
              .bindPopup('You are here')
              .openPopup();
          },
          () => {
            alert('Could not get your location.');
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    }
  }, []);

  const findRoute = (destination) => {
    if (!destination) {
      alert('Please enter a destination');
      return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${destination}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data[0]) {
          const destLocation = [data[0].lat, data[0].lon];
          L.marker(destLocation)
            .addTo(mapInstance.current)
            .bindPopup('Destination')
            .openPopup();

          if (routeControl) {
            routeControl.setWaypoints([L.latLng(userLocation), L.latLng(destLocation)]);
          } else {
            const newRouteControl = L.Routing.control({
              waypoints: [L.latLng(userLocation), L.latLng(destLocation)],
              routeWhileDragging: true,
            }).addTo(mapInstance.current);

            newRouteControl.on('routesfound', () => {
              const container = document.querySelector('.leaflet-routing-container');
              if (container) {
                let minimizeButton = container.querySelector('.maps-route-minimize-btn');
                if (!minimizeButton) {
                  minimizeButton = document.createElement('button');
                  minimizeButton.className = 'maps-route-minimize-btn';
                  minimizeButton.textContent = '-';
                  container.insertAdjacentElement('afterbegin', minimizeButton);

                  minimizeButton.onclick = () => {
                    container.style.display = 'none';
                    setIsMinimized(true);
                  };
                }
              }
            });

            setRouteControl(newRouteControl);
          }
        } else {
          alert('Destination not found!');
        }
      })
      .catch((error) => {
        console.error('Error fetching destination coordinates:', error);
        alert('Failed to get destination coordinates.');
      });
  };

  return (
    <div className="maps-route-container">
      <input type="text" id="maps-destination" placeholder="Where you wanna go ?" />
      <button
        id="maps-route-btn"
        onClick={() => {
          const destination = document.getElementById('maps-destination').value;
          findRoute(destination);
        }}
      >
        Get Route
      </button>
      <div id="maps-map" ref={mapRef}></div>
      {isMinimized && (
        <button
          className="maps-route-maximize-btn"
          onClick={() => {
            const container = document.querySelector('.leaflet-routing-container');
            if (container) {
              container.style.display = 'block';
            }
            setIsMinimized(false);
          }}
        >
          +
        </button>
      )}
    </div>
  );
};

export default LeafletRoute;