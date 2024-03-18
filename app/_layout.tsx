import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import { useCallback } from "react";
import { View, StyleSheet } from "react-native";

// prevent the os from removing the splashscreen
// until fonts are loaded
SplashScreen.preventAutoHideAsync();

const IndexLayout = () => {
  let [fontsLoaded, fontError] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
      // after success or unsuccess loading of fonts remove the splash
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <PaperProvider>
        <SafeAreaProvider>
          <Stack>
            {/* Splash screen show for new users */}
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />

            {/* home page: view, add, edit */}
            <Stack.Screen
              name="home"
              options={{
                headerShown: false,
              }}
            />

            {/* Detail page: view more details about the task */}
            <Stack.Screen
              name="detail"
              options={{
                headerShown: false,
                presentation: "modal",
              }}
            />

            {/* Edit page: edit details */}
            <Stack.Screen
              name="edit"
              options={{
                headerShown: false,
              }}
            />

            {/* Add Task page: page to add new task */}
            <Stack.Screen
              name="add"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </SafeAreaProvider>
      </PaperProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default IndexLayout;
