import React from "react";
import { StyleSheet, View } from "react-native";

import CustomButton from "@/components/custom-button";
import RNInsider from "react-native-insider";

function Wishlist() {
  const styles = StyleSheet.create({
    row: {
      width: "100%",
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  // --- WISHLIST --- //
  const taxonomy = ["taxonomy1", "taxonomy2", "taxonomy3"];

  let insiderExampleProduct = RNInsider.createNewProduct(
    "productID",
    "productName",
    taxonomy,
    "imageURL",
    1000.5,
    "currency"
  );

  const itemAddedToWishlist = () => {
    const uniqueSaleID = 'uniqueSaleID';

    RNInsider.itemAddedToWishlist(insiderExampleProduct);

    console.log("[INSIDER][itemAddedToWishlist]: Method is triggered.");
    console.log("[INSIDER][itemAddedToWishlist][productSummary]: ", insiderExampleProduct);
  };

  const itemRemovedFromWishlist = () => {
    RNInsider.itemRemovedFromWishlist("productID");

    console.log("[INSIDER][itemRemovedFromWishlist]: Method is triggered.");
    console.log("[INSIDER][itemRemovedFromWishlist][productSummary]: ", insiderExampleProduct);
  };

  const wishlistCleared = () => {
    RNInsider.wishlistCleared();

    console.log("[INSIDER][wishlistCleared]: Method is triggered.");
  };

  const visitWishlistPage = () => {
    RNInsider.visitWishlistPage(
        [insiderExampleProduct]
    );

    console.log("[INSIDER][visitWishlistPage]: Method is triggered.");
  };

  return (
    <View>
      <View style={styles.row}>
        <CustomButton text="Item Add To Wishlist" onPress={itemAddedToWishlist} />
        <CustomButton text="Item Remove From Wishlist" onPress={itemRemovedFromWishlist} />
      </View>

      <View style={styles.row}>
        <CustomButton text="Wishlist Clear" onPress={wishlistCleared} />
        <CustomButton text="Visit Wishlist Page" onPress={visitWishlistPage} />
      </View>
    </View>
  );
}

export default Wishlist;
