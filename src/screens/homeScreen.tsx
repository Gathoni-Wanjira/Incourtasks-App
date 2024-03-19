import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/actions/task";
import { RootState } from "../store/reducers/ store";
import { TaskModel } from "../store/models/taskModel";
import { EmptyListComponent } from "../components/emptyListComponent";
import { STATES } from "../utils/constants";

export const HomeScreen = () => {
  //hooks
  const colors = useAppTheme();
  const router = useRouter();

  const [state, setState] = useState("ALL");

  ///
  const goToaddTask = () => {
    router.navigate("add");
  };

  // filter tasks
  function filterTasks(value: string): TaskModel[] {
    if (value === "ALL") {
      return tasks;
    }
    return tasks.filter((item) => item.status === value);
  }

  // redux
  const dispatch = useDispatch();
  // get state from store
  const tasks = useSelector((state: RootState) => state) as TaskModel[];

  useEffect(() => {
    // fetch all tasks
    dispatch(fetchTasks());
  }, []);

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
        <Chip
          style={{
            backgroundColor: "ALL" === state ? colors.primary : colors.primary,
            opacity: "ALL" === state ? 1.0 : 0.7,
          }}
          compact={true}
          selected={"ALL" === state}
          selectedColor={colors.white}
          textStyle={[
            styles.chipText,
            {
              color: colors.white,
            },
          ]}
          onPress={() => setState("ALL")}
        >
          ALL
        </Chip>
        {STATES.map((item, i) => {
          return (
            <Chip
              key={i}
              style={{
                backgroundColor:
                  item.value === state ? colors.primary : colors.primary,
                opacity: item.value === state ? 1.0 : 0.7,
              }}
              compact={true}
              selected={item.value === state}
              selectedColor={colors.white}
              textStyle={[
                styles.chipText,
                {
                  color: colors.white,
                },
              ]}
              onPress={() => setState(item.value)}
            >
              {item.label}
            </Chip>
          );
        })}
      </View>

      {/* content */}
      <FlashList
        data={filterTasks(state)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: 75,
        }}
        ListEmptyComponent={EmptyListComponent}
        renderItem={({ item }) => {
          return (
            <TaskComponent
              key={item.id}
              item={item}
              onPress={() => {
                router.push({
                  pathname: "/detail",
                  params: {
                    item: JSON.stringify(item),
                  },
                });
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