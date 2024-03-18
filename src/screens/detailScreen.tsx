import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import useAppTheme from "../utils/colors";
import { TextTopography } from "../utils/textTopograhy";
import { TextFontFamily } from "../utils/fontFamily";

export const DetailScreen = () => {
  const colors = useAppTheme();
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="View Task" />
        <Appbar.Action
          icon="pencil"
          onPress={() => {
            router.navigate("edit");
          }}
        />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text
          style={[
            TextTopography.h4,
            {
              ...TextFontFamily.semiBold,
            },
          ]}
        >
          Name
        </Text>
        <Text>Sample Name</Text>
        <View style={styles.spacer} />
        <Text
          style={[
            TextTopography.h4,
            {
              ...TextFontFamily.semiBold,
            },
          ]}
        >
          Description
        </Text>
        <Text>Sample Description</Text>
        <View style={styles.spacer} />
        <Text
          style={[
            TextTopography.h4,
            {
              ...TextFontFamily.semiBold,
            },
          ]}
        >
          Date Created
        </Text>
        <Text>Mon 12 2024, 14:09 PM</Text>
        <View style={styles.spacer} />
        <Text
          style={[
            TextTopography.h4,
            {
              ...TextFontFamily.semiBold,
            },
          ]}
        >
          Status
        </Text>
        <Text>In Progress</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollViewContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 5,
  },
  spacer: {
    height: 7,
  },
  addButton: {
    marginTop: 15,
  },
});
