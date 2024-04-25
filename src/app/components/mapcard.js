// MapCard.js
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapCard = () => {
    useEffect(() => {
        // Initialize map only once when the component mounts
        const map = L.map('map').setView([51.505, -0.09], 13);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        // Clean up function to remove the map instance when the component unmounts
        return () => {
            map.remove();
        };
    }, []); // Empty dependency array ensures the effect runs only once

    return <div id="map" style={{ height: '650px' }}></div>;
};

export default MapCard;
