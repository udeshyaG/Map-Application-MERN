import React, { useState, useEffect, Fragment } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { listLogEntries } from "./Api";
import LogEntryForm from "./LogEntryForm";
import Rating from "./Rating";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopUp, setShowPopUp] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);

  const [viewport, setViewPort] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 3,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPop = (event) => {
    // console.log(event.lngLat);
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewPort(nextViewport)}
      onDblClick={showAddMarkerPop}
    >
      {logEntries.map((entry) => (
        <Fragment key={entry._id}>
          <Marker
            latitude={entry.latitude}
            longitude={entry.longitude}
            // coordinates={[entry.longitude, entry.latitude]}
            // offsetLeft={-20}
            // offsetTop={-10}
          >
            <div
              onClick={() =>
                setShowPopUp({
                  [entry._id]: true,
                })
              }
            >
              <svg
                viewBox="0 0 24 24"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                className="marker"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>

          {showPopUp[entry._id] ? (
            <Fragment>
              <Popup
                className="popup"
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={true}
                dynamicPosition={true}
                anchor="top"
                onClose={() => setShowPopUp({})}
              >
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                  <p>
                    Rating : <Rating rating={entry.rating} />{" "}
                  </p>
                  <small>Visited at : {entry.createdAt.substring(0, 10)}</small>
                  {entry.image && <img src={entry.image} alt={entry.title} />}
                </div>
              </Popup>
            </Fragment>
          ) : null}
        </Fragment>
      ))}

      {addEntryLocation ? (
        <Fragment>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            // coordinates={[entry.longitude, entry.latitude]}
            // offsetLeft={-20}
            // offsetTop={-10}
          >
            <div>
              <svg
                viewBox="0 0 24 24"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                className="marker"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          <Popup
            className="popup-form"
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            anchor="top"
            onClose={() => setAddEntryLocation(null)}
          >
            <div className="popup-content">
              <h3>Add new Location</h3>
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </Fragment>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
