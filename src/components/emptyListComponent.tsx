import { View, Image, StyleSheet, Text } from "react-native";
import { screenHeight, screenWidth } from "../utils/size";
import { TextTopography } from "../utils/textTopograhy";
import { TextFontFamily } from "../utils/fontFamily";

export const EmptyListComponent = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/bg2.png")}
      />
      <Text style={[TextTopography.h3, styles.title]}>No Tasks</Text>
      <Text style={[TextTopography.body2, styles.subtitle]}>
        Please add tasks to unlock the next level of efficiency
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    objectFit: "contain",
    height: screenHeight * 0.4,
    width: screenWidth,
    // opacity: 0.9,
  },
  title: {
    ...TextFontFamily.bold,
  },
  subtitle: {
    ...TextFontFamily.medium,
    textAlign: 'center',
  },
});
