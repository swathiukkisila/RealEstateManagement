import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";

function Pin({ item }) {
  const lat = parseFloat(item.latitude);
  const lng = parseFloat(item.longitude);

  // Safety: skip marker if invalid coords
  if (isNaN(lat) || isNaN(lng)) return null;

  return (
    <Marker position={[lat, lng]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images[0]} alt="property" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
