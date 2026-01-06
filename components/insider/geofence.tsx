import React from "react";

import CustomButton from "@/components/custom-button";
import RNInsider from "react-native-insider";

function Geofence() {
  const triggerGeofence = () => {
    // --- GEOFENCE --- //

    RNInsider.startTrackingGeofence();
  };

  return (
    <>
      <CustomButton text="Start Tracking Geofence" onPress={triggerGeofence} />
    </>
  );
}

export default Geofence;
