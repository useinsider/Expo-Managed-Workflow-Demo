import React from "react";
import { StyleSheet, View } from "react-native";

import CustomButton from "@/components/custom-button";
import RNInsider from "react-native-insider";
import RNInsiderIdentifier from 'react-native-insider/src/InsiderIdentifier';

const UserIdentifiers = () => {
  const styles = StyleSheet.create({
    row: {
      width: "100%",
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const login = () => {
    let currentUser = RNInsider.getCurrentUser();

    // Setting User Identifiers.
    let identifiers = new RNInsiderIdentifier();
    identifiers.addEmail("mobilexuseinsider@useinsider.com");

    currentUser.login(identifiers, (insiderID: string) => {
      console.log("[INSIDER][insiderID]: ", insiderID);
    });

    console.log("[INSIDER][login]: ", identifiers);
  };

  const logout = () => {
    let currentUser = RNInsider.getCurrentUser();

    currentUser.logout();

    console.log("[INSIDER][logout]: Method is triggered.");
  };

  return (
    <>
      <View style={styles.row}>
        <CustomButton text="Login" onPress={login} />
        <CustomButton
          text="Logout"
          buttonStyle={{ backgroundColor: "#E57F74" }}
          onPress={logout}
        />
      </View>
      <View style={styles.row}>
        <CustomButton
          text="Logout Resetting Insider ID"
          buttonStyle={{ backgroundColor: "#E57F74" }}
          onPress={logout}
        />
      </View>
    </>
  );
};

export default UserIdentifiers;
