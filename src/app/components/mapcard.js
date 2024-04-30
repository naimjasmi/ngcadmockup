import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import styles from './mapcard.module.css';

const MapCard = () => {
    const [map, setMap] = useState(null);
    const [currentLayer, setCurrentLayer] = useState('street');
    const [panelOpen, setPanelOpen] = useState(false); // State to control panel open/close
    const [selectedMarker, setSelectedMarker] = useState(null); // State to store selected marker
    const [selectedEventName, setSelectedEventName] = useState(''); // State to store selected event name
    const [markers, setMarkers] = useState([]); // State to store markers

    const streetButtonControl = useRef(null);
    const topoButtonControl = useRef(null);
    const closeButton = useRef(null); // Reference to the close panel button
    const openButton = useRef(null); // Reference to the open panel button
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
        const initialMarkers = [
            {lat: 2.9300, lng: 101.6600, description: 'Marker 1 Description', nature: 'Fire', reportingPerson: 'John Doe', riskLevel: 'High', priority: 'Urgent'},
            {lat: 2.9100, lng: 101.6500, description: 'Marker 2 Description', nature: 'Flood', reportingPerson: 'Jane Smith', riskLevel: 'Medium', priority: 'High'},
            {lat: 2.9400, lng: 101.6700, description: 'Marker 3 Description', nature: 'Earthquake', reportingPerson: 'Alice Johnson', riskLevel: 'Low', priority: 'Medium'},
            {lat: 2.9200, lng: 101.6400, description: 'Marker 4 Description', nature: 'Accident', reportingPerson: 'Bob Brown', riskLevel: 'High', priority: 'Urgent'},
            {lat: 2.9500, lng: 101.6800, description: 'Marker 5 Description', nature: 'Medical Emergency', reportingPerson: 'Eve Wilson', riskLevel: 'Medium', priority: 'High'},
        ];

        const generateRandomEventName = () => {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numbers = '0123456789';
            let randomEventName = '';
            for (let i = 0; i < 2; i++) {
                randomEventName += letters.charAt(Math.floor(Math.random() * letters.length));
            }
            for (let i = 0; i < 3; i++) {
                randomEventName += numbers.charAt(Math.floor(Math.random() * numbers.length));
            }
            return randomEventName;
        };

        initialMarkers.forEach((marker, index) => { // Added index for key in map
            const {lat, lng, description, nature, reportingPerson, riskLevel, priority} = marker;
            const [latitude, longitude] = [lat.toFixed(6), lng.toFixed(6)]; // Round coordinates to 6 decimal places
            const eventName = generateRandomEventName(); // Generate dummy event name
            const dummyDescription = "This is a dummy description for emergency CAD system."; // Dummy description
            const newMarker = L.marker([lat, lng], { icon: redIcon }).addTo(leafletMap);
            newMarker.bindPopup(`
                <div class="${styles.popupContent}">
                    <h3>${eventName}</h3>
                    <hr/>
                    <p><strong>Coordinates:</strong> ${latitude}, ${longitude}</p>
                    <p><strong>Description:</strong> ${dummyDescription}</p>
                </div>
            `);
            newMarker.on('click', () => {
                setSelectedMarker(marker);
                setSelectedEventName(eventName); // Set selected event name when marker is clicked
                setPanelOpen(true); // Open panel when marker is clicked
            });
        });
        setMarkers(initialMarkers);

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
            if (closeButton.current) {
                closeButton.current.remove();
            }
            if (openButton.current) {
                openButton.current.remove();
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

            // Add close panel button if panel is open
            if (panelOpen) {
                closeButton.current = L.control({ position: 'topleft' });
                closeButton.current.onAdd = function () {
                    const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
                    const button = L.DomUtil.create('button', 'leaflet-button');
                    button.innerHTML = 'X';
                    button.onclick = togglePanel;
                    container.appendChild(button);
                    // Add styling...
                    return container;
                };
                closeButton.current.addTo(map);
            } else {
                // Add open panel button if panel is closed
                openButton.current = L.control({ position: 'topleft' });
                openButton.current.onAdd = function () {
                    const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
                    const button = L.DomUtil.create('button', 'leaflet-button');
                    button.innerHTML = 'Open Panel';
                    button.onclick = togglePanel;
                    container.appendChild(button);
                    // Add styling...
                    return container;
                };
                openButton.current.addTo(map);
            }
        }
    }, [map, panelOpen]);

    const handleViewDetails = () => {
        // Implement view details functionality here
        console.log("View Details clicked");
    };

    return (
        <div className={styles.mapContainer}>
            {panelOpen && (
                <div className={styles.panel}>
                    {/* Add your panel content here */}
                    <br/>
                    {selectedMarker && (
                        <div>
                            <h3>{`Event ${selectedEventName}`}</h3>
                            <p><strong>Coordinates</strong><br/> {selectedMarker.lat.toFixed(6)}, {selectedMarker.lng.toFixed(6)}</p>
                            <p><strong>Description</strong><br/> {selectedMarker.description}</p>
                            <p><strong>Nature</strong> <br/> {selectedMarker.nature}</p>
                            <p><strong>Reporting Person</strong><br/> {selectedMarker.reportingPerson}</p>
                            <p><strong>Risk Level</strong><br/> {selectedMarker.riskLevel}</p>
                            <p><strong>Priority</strong><br/> {selectedMarker.priority}</p>
                            <button onClick={handleViewDetails}>View Details</button>
                        </div>
                    )}
                </div>
            )}
            <div id="map" className={styles.map}></div>
        </div>
    );
};

export default MapCard;
