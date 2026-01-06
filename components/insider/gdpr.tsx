import React from "react";
import { StyleSheet, View } from "react-native";

import CustomButton from "@/components/custom-button";
import RNInsider from "react-native-insider";

function GDPRMethods() {
  const styles = StyleSheet.create({
    row: {
      width: "100%",
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  // --- GDPR --- //

  const setGDPR = (gdprStatus: boolean) => {
    RNInsider.setGDPRConsent(gdprStatus);

    console.log("INSIDER GDPR Status: " + gdprStatus);
  };

  // --- Mobile App Access --- //

  const setMobileAppAccess = (mobileAppAccessStatus: boolean) => {
    RNInsider.setMobileAppAccess(mobileAppAccessStatus);

    console.log("INSIDER Mobile App Access Status: " + mobileAppAccessStatus);
  };

  return (
    <>
      <View style={styles.row}>
        <CustomButton
          text="GDPR True"
          onPress={() => {
            setGDPR(true);
          }}
        />
        <CustomButton
          text="GDPR False"
          onPress={() => {
            setGDPR(false);
          }}
        />
      </View>
      <View style={styles.row}>
        <CustomButton
          text="Mobile App Access True"
          onPress={() => {
            setMobileAppAccess(true);
          }}
        />
        <CustomButton
          text="Mobile App Access False"
          onPress={() => {
            setMobileAppAccess(false);
          }}
        />
      </View>
    </>
  );
}

export default GDPRMethods;
