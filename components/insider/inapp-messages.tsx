import React from "react";

import CustomButton from "@/components/custom-button";
import RNInsider from "react-native-insider";

function InappMessages() {
  const enableInappMessages = () => {
    // --- INAPP MESSAGES --- //

    RNInsider.enableInAppMessages();
  };

  const disableInappMessages = () => {
    // --- INAPP MESSAGES --- //

    RNInsider.disableInAppMessages();
  };

  return (
    <>
      <CustomButton text="Enable Inapp Messages" onPress={enableInappMessages} />
      <CustomButton text="Disable Inapp Messages" onPress={disableInappMessages} />
    </>
  );
}

export default InappMessages;
