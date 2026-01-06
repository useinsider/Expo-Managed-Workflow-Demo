import messaging from '@react-native-firebase/messaging';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PermissionsAndroid, Platform } from 'react-native';
import RNInsider from 'react-native-insider';
import InsiderCallbackType from 'react-native-insider/src/InsiderCallbackType';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect } from 'react';

async function getToken() {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);
}

async function requestNotificationPermission() {
  try {
    if (Platform.OS == "ios") {
      const authStatus = await messaging().requestPermission();
      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }
  } catch (error) {
    console.log(error);
  }
}

async function requestLocationPermission() {
  try {
    if (Platform.OS != "android") return;

    const fineLocationGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Application Camera Permission",
        message: "The application requires access to the camera.",
        buttonNeutral: "Ask Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );

    if (fineLocationGranted === PermissionsAndroid.RESULTS.GRANTED) {
      const bgLocationGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: "Background Location Permission for App",
          message:
            "The app requires background location permission to provide you better service using your location in the background.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Deny",
          buttonPositive: "Allow",
        }
      );

      if (bgLocationGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permissions successfully granted");
      } else {
        console.log("Background location permission not granted");
      }
    } else {
      console.log("Location permission not granted");
    }
  } catch (err) {
    console.warn(err);
  }
}

const initInsider = () => {
  // FIXME-INSIDER: Please change with your partner name and app group.
  RNInsider.init(
    "sdktest",
    "group.com.useinsider.mobile-ios",
    (type: any, data: any) => {
      switch (type) {
        case InsiderCallbackType.NOTIFICATION_OPEN:
          console.log("[INSIDER][NOTIFICATION_OPEN]: ", data);
          break;
        case InsiderCallbackType.TEMP_STORE_CUSTOM_ACTION:
          console.log("[INSIDER][TEMP_STORE_CUSTOM_ACTION]: ", data);
          break;
        case InsiderCallbackType.INAPP_SEEN:
          console.log("[INSIDER][INAPP_SEEN]: ", data);
          break;
          case InsiderCallbackType.SESSION_STARTED:
            console.log("[INSIDER][SESSION_STARTED]: ", data);
            break;
      }
    }
  );

  RNInsider.registerWithQuietPermission(false);
  RNInsider.setActiveForegroundPushView();
  RNInsider.startTrackingGeofence();
  RNInsider.enableIDFACollection(false);
  RNInsider.enableIpCollection(false);
  RNInsider.enableLocationCollection(false);
  RNInsider.enableCarrierCollection(false);

  console.log("[INSIDER] initialized");
};

const setupFirebase = () => {
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    console.log(
        "[FCM][onMessage]: A new FCM message arrived! :" +
        JSON.stringify(remoteMessage)
    );

    if ((remoteMessage.data || {}).source === "Insider") {
      RNInsider.handleNotification(remoteMessage.data);
    }
  });

  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
        "[FCM][onNotificationOpenedApp]: Notification caused app to open:" +
        JSON.stringify(remoteMessage)
    );
  });

  messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
              "[FCM][getInitialNotification]: Notification caused app to open from quit state:",
              remoteMessage.notification
          );
        }
      });

  return unsubscribe;
}

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const unsubscribe = setupFirebase();

    initInsider();
    
    requestNotificationPermission();
    requestLocationPermission();

    return unsubscribe;
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
