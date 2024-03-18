import React, { useState } from "react";
import { StyleSheet, Text, SafeAreaView, Platform, View } from "react-native";
import { FAB } from "react-native-paper";
import useAppTheme from "../utils/colors";
import { Appbar } from "react-native-paper";
import { TextTopography } from "../utils/textTopograhy";
import { TextFontFamily } from "../utils/fontFamily";
import { Chip } from "react-native-paper";
import { screenWidth } from "../utils/size";
import { FlashList } from "@shopify/flash-list";

import { useRouter } from "expo-router";
import { TaskComponent } from "../components/taskComponent";

const states = ["All", "In Progress", "Pending", "Completed"];
const states2 = [
  "All",
  "In Progress",
  "Pending",
  "Completed",
  "All",
  "In Progress",
  "Pending",
  "Completed",
  "Completed",
  "All",
  "In Progress",
  "Pending",
  "Completed",
];

export const HomeScreen = () => {
  //hooks
  const colors = useAppTheme();
  const router = useRouter();

  const [state, setState] = useState("All");

  //
  const goToaddTask = () => {
    router.navigate("add");
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* App bar */}
      <Appbar.Header mode="medium">
        <Appbar.Content
          title={
            <View>
              <Text style={[TextTopography.h4, styles.appBarTitle]}>
                Hello there,
              </Text>
              <Text style={[TextTopography.caption, styles.appBarSubtitle]}>
                Good morning, let's get this
              </Text>
            </View>
          }
        />
      </Appbar.Header>

      {/* chips row */}
      <View style={styles.chipRowContainer}>
        {states.map((item, i) => {
          return (
            <Chip
              key={i}
              style={{
                backgroundColor:
                  item === state ? colors.primary : colors.primary,
                opacity: item === state ? 1.0 : 0.7,
              }}
              compact={true}
              selected={item === state}
              selectedColor={colors.white}
              textStyle={[
                styles.chipText,
                {
                  color: colors.white,
                },
              ]}
              onPress={() => setState(item)}
            >
              {item}
            </Chip>
          );
        })}
      </View>

      {/* content */}
      <FlashList
        data={states2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: 75,
        }}
        renderItem={({ item }) => {
          return (
            <TaskComponent
              key={item}
              onPress={() => {
                router.navigate("detail");
              }}
            />
          );
        }}
        estimatedItemSize={200}
      />

      {/* Floating action button  */}
      <FAB
        icon="plus"
        color={colors.white}
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={goToaddTask}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  appBarTitle: {
    fontFamily: TextFontFamily.medium.fontFamily,
  },
  appBarSubtitle: {
    fontFamily: TextFontFamily.regular.fontFamily,
  },
  chipRowContainer: {
    display: "flex",
    flexDirection: "row",
    width: screenWidth,
    marginTop: 10,
    paddingHorizontal: 15,
    gap: 6,
    marginBottom: 12,
  },
  chipText: {
    ...TextTopography.caption,
    ...TextFontFamily.regular,
  },
  contentContainer: {
    flex: 1,
    flexGrow: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
