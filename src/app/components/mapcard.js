import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import styles from './mapcard.module.css';

const MapCard = () => {
    const [map, setMap] = useState(null);
    const [currentLayer, setCurrentLayer] = useState('street');
    const [panelOpen, setPanelOpen] = useState(true); // State to control panel open/close

    const streetButtonControl = useRef(null);
    const topoButtonControl = useRef(null);
    const panelButtonControl = useRef(null);
    const zoomControl = useRef(null); // Reference to the zoom control

    useEffect(() => {
        const leafletMap = L.map('map', { zoomControl: false }).setView([2.9213, 101.6559], 13);
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

        markers.forEach((marker, index) => { // Added index for key in map
            const [lat, lng, description] = marker;
            const newMarker = L.marker([lat, lng], { icon: redIcon }).addTo(leafletMap);
            newMarker.bindPopup(`
                <div>
                    <h3>${description}</h3>
                    <p>Additional information can go here...</p>
                </div>
            `);
        });

        // Add zoom control to the bottom right
        zoomControl.current = L.control.zoom({ position: 'bottomright' }).addTo(leafletMap);

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

    const togglePanel = () => {
        setPanelOpen(!panelOpen);
    };

    useEffect(() => {
        if (map) {
            // Remove existing controls
            if (streetButtonControl.current) {
                streetButtonControl.current.remove();
            }
            if (topoButtonControl.current) {
                topoButtonControl.current.remove();
            }
            if (panelButtonControl.current) {
                panelButtonControl.current.remove();
            }

            // Add street button control
            streetButtonControl.current = L.control({ position: 'topright' });
            streetButtonControl.current.onAdd = function () {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
                const button = L.DomUtil.create('button', 'leaflet-button');
                button.innerHTML = 'Street';
                button.onclick = () => handleLayerChange('street');
                container.appendChild(button);
                // Add styling...
                return container;
            };
            streetButtonControl.current.addTo(map);

            // Add topo map button control
            topoButtonControl.current = L.control({ position: 'topright' });
            topoButtonControl.current.onAdd = function () {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
                const button = L.DomUtil.create('button', 'leaflet-button');
                button.innerHTML = 'TopoMap';
                button.onclick = () => handleLayerChange('topoMap');
                container.appendChild(button);
                // Add styling...
                return container;
            };
            topoButtonControl.current.addTo(map);

            // Add panel button control
            panelButtonControl.current = L.control({ position: 'topleft' });
            panelButtonControl.current.onAdd = function () {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
                const button = L.DomUtil.create('button', 'leaflet-button');
                button.innerHTML = panelOpen ? 'Close Panel' : 'Open Panel';
                button.onclick = togglePanel;
                container.appendChild(button);
                // Add styling...
                return container;
            };
            panelButtonControl.current.addTo(map);
        }
    }, [map, panelOpen]);

    return (
        <div className={styles.mapContainer}>
            {panelOpen && (
                <div className={styles.panel}>
                    {/* Add your panel content here */}
                    <h2>Marker Panel</h2>
                    <ul>
                        {/* Dummy list of markers */}
                        <li>Marker 1 - Location 1</li>
                        <li>Marker 2 - Location 2</li>
                        <li>Marker 3 - Location 3</li>
                        <li>Marker 4 - Location 4</li>
                        <li>Marker 5 - Location 5</li>
                    </ul>
                </div>
            )}
            <div id="map" className={styles.map}></div>
        </div>
    );
};

export default MapCard;
