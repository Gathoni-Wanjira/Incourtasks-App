import { useColorScheme } from "react-native";

const Colors = {
  // light: {
  background: "#ffffff",
  text: "#14172C",
  white: "#ffffff",
  mutedText: "#444555",
  primary: "#1FA055",
  primaryLight: "#8CE9B3",
  error: "#FF0045",
  blue: "#0000ff",
  blueLight: "#a5a5fa",
  green: "#4CD964",
  greenLight: "#c0faca",
  orange: "#FE9500",
  orangeLight: "#fce9cc",
  yellow: "#FFC700",
  grey: "#7A869A",
  strongGrey: "#7D7D82",
  lightGrey: "#C4C4C6",
  lighterGrey: "#E3E6EA",
  lightestGrey: "#F5F6FA",
  // },
  // dark: {
  //   background: "#ffffff",
  //   text: "#14172C",
  //   white: "#ffffff",
  //   mutedText: "#444555",
  //   primary: "#1FA055",
  //   primaryLight: "#1FA055",
  //   error: "#FF0045",
  //   green: "#4CD964",
  //   grey: "#7A869A",
  //   strongGrey: "#7D7D82",
  //   lightGrey: "#C4C4C6",
  //   lighterGrey: "#E3E6EA",
  //   lightestGrey: "#F5F6FA",
  // },
};

export default function useAppTheme() {
  // // can be either light or dark
  // const colorScheme = useColorScheme();
  // if (!colorScheme) {
  //   // default to light
  //   return Colors.light;
  // }
  // const colors = Colors[colorScheme];
  return Colors;
}

// example to use this hook

/**
 * const colors = useAppTheme();
 * colors.primary
 * colors.error
 */

export const mapStateToColor = (state: string): Record<string, string> => {
  switch (state) {
    case "INPROGRESS":
      return {
        color: Colors.blue,
        muted: Colors.blueLight,
      };
    case "PENDING":
      return {
        color: Colors.orange,
        muted: Colors.orangeLight,
      };
    case "COMPLETED":
      return {
        color: Colors.green,
        muted: Colors.greenLight,
      };

    default:
      return {
        color: Colors.blue,
        muted: Colors.blueLight,
      };
  }
};
