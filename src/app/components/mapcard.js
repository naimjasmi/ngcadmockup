import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import { FaMapMarkerAlt } from 'react-icons/fa';
import styles from './mapcard.module.css';

const MapCard = () => {
    useEffect(() => {
        const map = L.map('map').setView([2.9213, 101.6559], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        // Create a custom div icon with React Icons (Font Awesome) and larger size
        const icon = L.divIcon({
            className: 'fa-icon',
            html: ReactDOMServer.renderToString(<FaMapMarkerAlt size="2x" />), // Increase the size using "2x"
            iconSize: [20, 20], // Increase the size of the icon container
        });

        // Add first dummy marker
        L.marker([2.9213, 101.6559], { icon: icon }).addTo(map);

        // Add more dummy markers
        L.marker([2.9300, 101.6600], { icon: icon }).addTo(map);
        L.marker([2.9100, 101.6500], { icon: icon }).addTo(map);

        return () => {
            map.remove();
        };
    }, []);

    return <div id="map" className={styles.map}></div>;
};

export default MapCard;
