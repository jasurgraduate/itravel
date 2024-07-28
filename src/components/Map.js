import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchBox from './SearchBox';
import MapEvents from './MapEvents';
import useHandleClick from './handleClick';
import createPopup from './createPopup';
import { zoomToLocation } from './zoomin';

const Map = ({ visitedPlaces, plannedPlaces }) => {
  const [searchCoords, setSearchCoords] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const mapRef = useRef(null);
  const { clickedCoords, handleMapClick, placeInfo } = useHandleClick();

  const defaultCenter = [41.505, -0.09];
  const defaultZoom = 3.1;
  const adjustedCenter = [defaultCenter[0], defaultCenter[1] + 50.05];

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

  return (
    <div className="map-container">
      <MapContainer center={adjustedCenter} zoom={defaultZoom} className="leaflet-map" whenCreated={(mapInstance) => (mapRef.current = mapInstance)}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="" />
        <SearchBox map={mapRef.current} onSearch={setSearchCoords} />
        <MapEvents onClick={handleMapClick} />
        {places.map((place) => createPopup(place, mapRef, handleCopyClick, copySuccess))}
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