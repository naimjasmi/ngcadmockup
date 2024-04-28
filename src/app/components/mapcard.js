import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import styles from './mapcard.module.css';

const MapCard = () => {
    const [map, setMap] = useState(null);
    const [currentLayer, setCurrentLayer] = useState('street');

    useEffect(() => {
        const leafletMap = L.map('map').setView([2.9213, 101.6559], 13);
        setMap(leafletMap);

        const layers = {
            street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }),
            topoMap: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenTopoMap'
            }),
        };

        layers.street.addTo(leafletMap);

        // Create red icon
        const redIcon = L.divIcon({
            className: 'custom-icon',
            html: ReactDOMServer.renderToString(<FaMapMarkerAlt color="red" size={24} />),
            iconSize: [24, 24],
        });

        // Add dummy markers
        const markers = [
            [2.9300, 101.6600, 'Marker 1 Description'],
            [2.9100, 101.6500, 'Marker 2 Description'],
            [2.9400, 101.6700, 'Marker 3 Description'],
            [2.9200, 101.6400, 'Marker 4 Description'],
            [2.9500, 101.6800, 'Marker 5 Description'],
        ];

        markers.forEach((marker) => {
            const [lat, lng, description] = marker;
            const newMarker = L.marker([lat, lng], { icon: redIcon }).addTo(leafletMap);
            newMarker.bindPopup(`
                <div>
                    <h3>${description}</h3>
                    <p>Additional information can go here...</p>
                </div>
            `);
        });

        return () => {
            leafletMap.remove();
        };
    }, []);

    useEffect(() => {
        if (map) {
            const layers = {
                street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors',
                }),
                topoMap: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenTopoMap'
                }),
            };

            // Clear existing layers
            map.eachLayer((layer) => {
                if (layer instanceof L.TileLayer) {
                    map.removeLayer(layer);
                }
            });

            // Add current layer
            layers[currentLayer].addTo(map);
        }
    }, [currentLayer, map]);

    const handleLayerChange = (layer) => {
        setCurrentLayer(layer);
    };

    useEffect(() => {
        if (map) {
            const streetButton = L.control({ position: 'topright' });
            streetButton.onAdd = function () {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
                const button = L.DomUtil.create('button', 'leaflet-button');
                button.innerHTML = 'Street';
                button.onclick = () => handleLayerChange('street');
                container.appendChild(button);

                // Apply styles
                container.style.backgroundColor = '#ffffff';
                container.style.borderRadius = '5px';
                container.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                container.style.padding = '5px';
                container.style.marginBottom = '5px';

                button.style.cursor = 'pointer';
                button.style.border = 'none';
                button.style.borderRadius = '5px';
                button.style.backgroundColor = '#007bff';
                button.style.color = '#ffffff';
                button.style.padding = '8px 12px';
                button.style.transition = 'background-color 0.3s ease';
                button.style.width = '100px'; // Adjust width as needed

                return container;
            };

            const topoButton = L.control({ position: 'topright' });
            topoButton.onAdd = function () {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
                const button = L.DomUtil.create('button', 'leaflet-button');
                button.innerHTML = 'TopoMap';
                button.onclick = () => handleLayerChange('topoMap');
                container.appendChild(button);

                // Apply styles
                container.style.backgroundColor = '#ffffff';
                container.style.borderRadius = '5px';
                container.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                container.style.padding = '5px';
                container.style.marginBottom = '5px';

                button.style.cursor = 'pointer';
                button.style.border = 'none';
                button.style.borderRadius = '5px';
                button.style.backgroundColor = '#007bff';
                button.style.color = '#ffffff';
                button.style.padding = '8px 12px';
                button.style.transition = 'background-color 0.3s ease';
                button.style.width = '100px'; // Adjust width as needed

                return container;
            };

            streetButton.addTo(map);
            topoButton.addTo(map);
        }
    }, [map]);

    return <div id="map" className={styles.map}></div>;
};

export default MapCard;
