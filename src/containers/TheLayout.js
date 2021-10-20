import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const TheLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const i = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (e) => {
          dispatch({
            type: "SET_GPS",
            gps: { lat: e.coords.latitude, lng: e.coords.longitude },
          });
        },
        () => {},
        { enableHighAccuracy: true, maximumAge: 0, timeout: 3000 }
      );
    }, 3000);
    return () => {
      clearInterval(i);
    };
  }, []);
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
