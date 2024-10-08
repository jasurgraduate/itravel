import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchBox from './SearchBox'; // Updated SearchBox handles both search and live location
import MapEvents from './MapEvents';
import useHandleClick from './handleClick';
import CreatePopup from './createPopup'; // Ensure this is the correct popup function
import { zoomToLocation } from './zoomin';
import { useMediaQuery } from '@mui/material'; // Import useMediaQuery

const Map = ({ visitedPlaces, plannedPlaces }) => {
  const [searchCoords, setSearchCoords] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const mapRef = useRef(null);
  const { clickedCoords, handleMapClick, placeInfo } = useHandleClick();

  // Define default configurations for desktop and mobile
  const isMobile = useMediaQuery('(max-width:600px)'); // Change threshold as needed

  const defaultCenter = isMobile ? [41.505, -0.09] : [41.505, -0.09]; // Adjust for mobile if needed
  const defaultZoom = isMobile ? 2.5 : 3.3; // Adjust zoom for mobile
  const adjustedCenter = [defaultCenter[0], defaultCenter[1] + (isMobile ? 32 : 65.05)]; // Adjust center position for mobile

  useEffect(() => {
    const map = mapRef.current;

    if (map) {
      map.on('click', (e) => {
        handleMapClick([e.latlng.lat, e.latlng.lng], mapRef);
      });
    }

    return () => {
      if (map) {
        map.off('click');
      }
    };
  }, [handleMapClick]);

  const handleCopyClick = () => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1500);
  };

  const copyCoordsToClipboard = (coords) => {
    navigator.clipboard.writeText(`coords: [${coords[0]}, ${coords[1]}]`);
    handleCopyClick();
  };

  useEffect(() => {
    if (searchCoords) {
      zoomToLocation(mapRef.current, searchCoords);
    }
  }, [searchCoords]);

  const places = [
    ...visitedPlaces.map((place) => ({ ...place, type: 'visited' })),
    ...plannedPlaces.map((place) => ({ ...place, type: 'planned' })),
    clickedCoords && placeInfo
      ? {
        coords: clickedCoords,
        type: 'clicked',
        name: placeInfo.name,
        flag: placeInfo.flag,
      }
      : null,
  ].filter(Boolean);

  // Function to handle zooming to a specific location
  const handlePlaceClick = (coords) => {
    zoomToLocation(mapRef.current, coords); // Zoom to the place's coordinates
  };

  return (
    <div className="map-container">
      <MapContainer
        center={adjustedCenter}
        zoom={defaultZoom}
        className="leaflet-map"
        zoomSnap={0.5}  // Makes zooming smoother by snapping to closer zoom levels
        zoomDelta={0.5} // Reduces the zoom step to slow down zoom in/out
        zoomControl={false} // Disable zoom controls
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="" />

        {/* Pass the necessary props to SearchBox */}
        <SearchBox
          map={mapRef.current}
          onSearch={setSearchCoords}
          handleCopyClick={handleCopyClick}
          copySuccess={copySuccess}
        />

        <MapEvents onClick={handleMapClick} />
        {places.map((place) => (
          <CreatePopup
            key={`${place.type}-${place.coords.join(',')}`}
            place={place}
            mapRef={mapRef}
            handleCopyClick={handleCopyClick}
            copySuccess={copySuccess}
            onPlaceClick={handlePlaceClick} // Pass the zoom function
          />
        ))}

        {searchCoords && (
          <Marker
            position={searchCoords}
            icon={L.divIcon({
              html: `<span class="unicode-icon">🔍</span>`,
              className: 'custom-div-icon',
              iconSize: [30, 30],
              iconAnchor: [15, 15],
            })}
          >
            <Popup>
              <div className="cont">
                <h2>Searched Location</h2>
                <br />
                {`Latitude: ${searchCoords[0]}, Longitude: ${searchCoords[1]}`}
                <br />
                <button
                  className={`copy-button ${copySuccess ? 'copied' : ''}`}
                  onClick={() => copyCoordsToClipboard(searchCoords)}
                >
                  {copySuccess ? 'Copied 😁!' : 'Copy Coords 🏌🏻‍♂️'}
                </button>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
