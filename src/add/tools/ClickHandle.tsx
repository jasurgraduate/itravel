import { useState } from 'react';
import { getCountryFlag } from './Flags';
import L from 'leaflet';

const useHandleClick = () => {
  const [clickedCoords, setClickedCoords] = useState<[number, number] | null>(null);
  const [placeInfo, setPlaceInfo] = useState<{ name: string; flag: any } | null>(null);

  const handleMapClick = async (coords: [number, number], mapRef: React.RefObject<L.Map>) => {
    setClickedCoords(coords);

    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords[0]}&lon=${coords[1]}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.address) {
        const { city, town, village, country_code, country, state, county, suburb, neighbourhood } = data.address;
        const placeName = city || town || village || suburb || neighbourhood || 'Unknown Place';
        const areaName = suburb || neighbourhood || state || county || '';
        const countryCode = country_code.toUpperCase();

        setPlaceInfo({
          name: areaName ? `${placeName} (${areaName}), ${country}` : `${placeName}, ${country}`,
          flag: getCountryFlag(countryCode),
        });
      }
    } catch (error) {
      console.error('Error fetching reverse geocoding data:', error);
    }
  };

  return { clickedCoords, handleMapClick, placeInfo };
};

export default useHandleClick;
