import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import { Appbar, Snackbar } from "react-native-paper";
import useAppTheme from "../utils/colors";
import { TextTopography } from "../utils/textTopograhy";
import { TextFontFamily } from "../utils/fontFamily";
import { TaskModel } from "../store/models/taskModel";
import { useDispatch } from "react-redux";
import { deleteTask } from "../store/actions/task";
import { useState } from "react";

export const DetailScreen = () => {
  const dispatch = useDispatch();
  const { item } = useLocalSearchParams();
  const colors = useAppTheme();
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const removeTask = () => {
    try {
      const id = (JSON.parse((item as string) ?? "{}") as TaskModel).id;
      if (id) {
        dispatch(deleteTask(id));
        setVisible(true);
        setMessage("Deleted task successfully");
        router.back();
      } else {
        console.log('Item',item)
        setVisible(true);
        setMessage("Error in deleting task");
      }
    } catch (e) {
      setVisible(true);
      setMessage("Error in deleting task");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="View Task" />
        <Appbar.Action
          icon="pencil"
          onPress={() => {
            router.push({
              pathname: "/edit",
              params: {
                item: item,
              },
            });
          }}
        />
        <Appbar.Action icon="delete" onPress={removeTask} />
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
        <Text>{(JSON.parse((item as string) ?? "{}") as TaskModel).name}</Text>
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
        <Text>
          {(JSON.parse((item as string) ?? "{}") as TaskModel).description}
        </Text>
        <View style={styles.spacer} />
        <Text
          style={[
            TextTopography.h4,
            {
              ...TextFontFamily.semiBold,
            },
          ]}
        >
          Date Due
        </Text>
        <Text>
          {(JSON.parse((item as string) ?? "{}") as TaskModel).dueDate}
        </Text>
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
        <Text>
          {(JSON.parse((item as string) ?? "{}") as TaskModel).createdAt}
        </Text>
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
        <Text>
          {(JSON.parse((item as string) ?? "{}") as TaskModel).status}
        </Text>
      </ScrollView>
      <Snackbar
        visible={visible}
        duration={4000}
        onDismiss={() => setVisible(false)}
      >
        {message}
      </Snackbar>
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