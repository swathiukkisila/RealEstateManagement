import { MapContainer, TileLayer, LayersControl, useMap } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";
import { useEffect } from "react";

const { BaseLayer } = LayersControl;

function FitBounds({ items }) {
  const map = useMap();

  useEffect(() => {
    if (items.length === 1) {
      const lat = parseFloat(items[0].latitude);
      const lng = parseFloat(items[0].longitude);
      map.setView([lat, lng], 16, { animate: true });
    } else if (items.length > 1) {
      const bounds = items.map(item => [
        parseFloat(item.latitude),
        parseFloat(item.longitude)
      ]);
      map.fitBounds(bounds, { padding: [50, 50], animate: true });
    }
  }, [items, map]);

  return null;
}

function Map({ items }) {
  return (
    <MapContainer
      center={[0, 0]} // temporary, will auto-set using FitBounds
      zoom={16}
      scrollWheelZoom={true}
      className="map"
    >
      <LayersControl position="topright">
        {/* Normal Map View */}
        <BaseLayer checked name="Street View">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>

        {/* Satellite View */}
        <BaseLayer name="Satellite View">
          <TileLayer
            attribution='Tiles &copy; Google'
            url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          />
        </BaseLayer>
      </LayersControl>

      {items.map((item) => (
        <Pin
          item={{
            ...item,
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
          }}
          key={item.id}
        />
      ))}

      <FitBounds items={items} />
    </MapContainer>
  );
}

export default Map;
