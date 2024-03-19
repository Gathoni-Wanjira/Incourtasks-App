import { useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Keyboard,
} from "react-native";
import { Appbar, TextInput, Button, Snackbar } from "react-native-paper";
import useAppTheme from "../utils/colors";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { TaskModel } from "../store/models/taskModel";
import { addTask } from "../store/actions/task";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { UnknownAction } from "@reduxjs/toolkit";

export const AddTaskScreen = () => {
  const colors = useAppTheme();
  const router = useRouter();

  // state
  const [name, setName] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const clearForm = () => {
    setName("");
    setDescription("");
    setSelectedDate(undefined);
  };

  // redux
  const dispatch = useDispatch();

  const onChange = (_: DateTimePickerEvent, date?: Date) => {
    if (date === undefined) {
      return;
    }
    setShowPicker(false);
    setSelectedDate(date);
  };

  const submitForm = () => {
    try {
      if (!name || !description || !selectedDate) {
        return;
      }
      const newData: TaskModel = {
        id: Math.random(),
        name: name,
        description: description,
        status: "PENDING",
        dueDate: selectedDate.toISOString(),
        createdAt: new Date().toISOString(),
      };
      console.log("data", newData);
      dispatch(((addTask(newData)) as unknown) as UnknownAction);
      setVisible(true);
      setMessage("Added task successfully");
    } catch (e) {
      setVisible(true);
      setMessage("Error adding tasks");
    }
  };

  useEffect(() => {
    // side effect when done clear form
    if (visible) {
      clearForm();
    }
  }, [visible]);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Add Task" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text>Name</Text>
        <TextInput
          mode="outlined"
          outlineColor={colors.primary}
          activeOutlineColor={colors.primary}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text>Due Date</Text>
        <TouchableOpacity
          style={[
            {
              backgroundColor: colors.lightestGrey,
              borderColor: colors.lighterGrey,
            },
          ]}
          onPress={() => setShowPicker(!showPicker)}
        >
          <View
            style={[
              styles.selectContainer,
              {
                backgroundColor: colors.white,
                borderColor: colors.primary,
              },
            ]}
          >
            {selectedDate ? (
              <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
            ) : (
              <></>
            )}
            {showPicker && (
              <DateTimePicker
                value={selectedDate ?? new Date()}
                mode={"date"}
                minimumDate={new Date()}
                onTouchCancel={() => {
                  setShowPicker(false);
                }}
                onTouchEnd={() => {
                  setShowPicker(false);
                }}
                onChange={onChange}
              />
            )}
          </View>
        </TouchableOpacity>
        <Text>Description</Text>
        <TextInput
          mode="outlined"
          multiline={true}
          style={{
            height: 150,
          }}
          outlineColor={colors.primary}
          activeOutlineColor={colors.primary}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <Button
          mode="contained"
          buttonColor={colors.orange}
          textColor={colors.mutedText}
          style={styles.addButton}
          onPress={() => {
            // keyboard dismiss
            Keyboard.dismiss();
            submitForm();
          }}
        >
          ADD TASK
        </Button>
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
  addButton: {
    marginTop: 15,
  },
  selectContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#bdc3c7",
    overflow: "hidden",
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  dateText: {},
});
