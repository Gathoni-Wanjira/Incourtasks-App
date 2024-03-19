import { View, Text, StyleSheet, Image } from "react-native";
import useAppTheme from "../utils/colors";
import { screenHeight, screenWidth } from "../utils/size";
import { LinearGradient } from "expo-linear-gradient";
import { TextTopography } from "../utils/textTopograhy";
import { TextFontFamily } from "../utils/fontFamily";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { setupDatabase } from "../data/database";

export const LandingScreen = () => {
  useEffect(() => {
    // setup DB when we launch the app first time
    setupDatabase();
  }, []);

  // hooks
  const colors = useAppTheme();
  const router = useRouter();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.white,
        },
      ]}
    >
      {/* component one: image */}
      <Image
        style={styles.image}
        source={require("../../assets/images/bg2.png")}
      />
      {/* component two: floating bottom */}
      <LinearGradient
        colors={["transparent", "rgba(31, 160, 85, 1.0)"]}
        style={styles.gradientContainer}
      >
        <Text
          style={[
            TextTopography.h2,
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          MyTask App
        </Text>
        <Text
          style={[
            TextTopography.body2,
            styles.subtitle,
            {
              color: colors.mutedText,
            },
          ]}
        >
          Efficiently manage your day to day activities by managing your tasks
        </Text>
        <Button
          mode="contained"
          buttonColor={colors.orange}
          textColor={colors.mutedText}
          onPress={() => {
            router.replace("home");
          }}
        >
          GET STARTED
        </Button>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  image: {
    objectFit: "contain",
    // height: screenHeight,
    width: screenWidth,
    // opacity: 0.9,
  },
  gradientContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 35,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: TextFontFamily.bold.fontFamily,
  },
  subtitle: {
    fontFamily: TextFontFamily.light.fontFamily,
    marginTop: 12,
    marginBottom: 35,
  },
});
