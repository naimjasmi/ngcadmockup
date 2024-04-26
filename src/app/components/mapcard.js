// mapcard.js
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './mapcard.module.css'; // Correct import statement

const MapCard = () => {
    useEffect(() => {
        const map = L.map('map').setView([2.9213, 101.6559], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        // Add a dummy marker
        L.marker([2.9213, 101.6559]).addTo(map)
            .bindPopup('Dummy Marker')
            .openPopup();

        return () => {
            map.remove();
        };
    }, []);

    return <div id="map" className={styles.map}></div>;
};

export default MapCard;
