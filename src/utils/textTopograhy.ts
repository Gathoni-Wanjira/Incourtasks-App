import { StyleSheet } from "react-native";
import { TextFontFamily } from "./fontFamily";

export const TextTopography = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontFamily: TextFontFamily.bold.fontFamily,
  },
  h2: {
    fontSize: 24,
  },
  h3: {
    fontSize: 20,
  },
  h4: {
    fontSize: 18,
  },
  h5: {
    fontSize: 16,
  },
  h6: {
    fontSize: 14,
  },
  subtitle1: {
    fontSize: 16,
  },
  subtitle2: {
    fontSize: 14,
  },
  body1: {
    fontSize: 16,
  },
  body2: {
    fontSize: 14,
  },
  caption: {
    fontSize: 12,
  },
  button: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  overline: {
    fontSize: 12,
    textTransform: "uppercase",
  },
});
