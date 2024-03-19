import { useLocalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Appbar, TextInput, Button, Snackbar } from "react-native-paper";
import useAppTheme from "../utils/colors";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { TaskModel } from "../store/models/taskModel";
import { STATES } from "../utils/constants";
import { useDispatch } from "react-redux";
import { editTask } from "../store/actions/task";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React from "react";
import { UnknownAction } from "@reduxjs/toolkit";

export const EditScreen = () => {
  const dispatch = useDispatch();
  const { item } = useLocalSearchParams();
  const colors = useAppTheme();
  const router = useRouter();

  const [status, setStatus] = useState("PENDING");
  const [name, setName] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // load intial values
    const payload = JSON.parse((item as string) ?? "{}") as TaskModel;

    setName(payload.name);
    setDescription(payload.description);
    setSelectedDate(new Date(payload.dueDate));
    setStatus(payload.status);
  }, []);

  const onChange = (_: DateTimePickerEvent, date?: Date) => {
    if (date === undefined) {
      return;
    }
    setShowPicker(false);
    setSelectedDate(date);
  };

  // handlers
  const handleCancel = () => {
    router.back();
  };

  const handleEdit = () => {
    try {
      const payload = JSON.parse((item as string) ?? "{}") as TaskModel;
      const newPayload: TaskModel = {
        ...payload,
        // check if null if not update our "object"
        ...(name != null && {
          name: name,
        }),
        // check if null if not update our "object"
        ...(description != null && {
          description: description,
        }),
        // update due date
        ...(selectedDate != null && {
          dueDate: selectedDate.toISOString(),
        }),
        // status can't be null at this point
        status: status,
      };
      console.log("New payload", newPayload)
      if (payload.id) {
        dispatch(((editTask(payload.id, newPayload)) as unknown) as UnknownAction);
        setVisible(true);
        setMessage("Successfully edited task");
        setTimeout(() => {
          router.replace("home");
        }, 1500);
      } else {
        setVisible(true);
        setMessage("Error in editing task");
      }
    } catch (e) {
      setVisible(true);
      setMessage("Error in editing task");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Edit Task" />
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
        <View style={styles.spacer} />
        <Text>Status</Text>
        <View
          style={[
            styles.selectContainer,
            {
              backgroundColor: colors.white,
              borderColor: colors.primary,
            },
          ]}
        >
          <Picker
            selectedValue={status}
            onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
          >
            {STATES.map((e) => {
              return (
                <Picker.Item key={e.value} label={e.label} value={e.value} />
              );
            })}
          </Picker>
        </View>
        <View style={styles.spacer} />
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
              styles.dateTextContainer,
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
        <View style={styles.spacer} />
        <Text>Description</Text>
        <TextInput
          mode="outlined"
          multiline={true}
          style={{
            minHeight: 100,
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
          onPress={handleEdit}
        >
          EDIT TASK
        </Button>
        <Button
          mode="outlined"
          // buttonColor={colors.orange}
          textColor={colors.mutedText}
          onPress={handleCancel}
        >
          CANCEL
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
  spacer: {
    height: 7,
  },
  selectContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#bdc3c7",
    overflow: "hidden",
  },
  addButton: {
    marginTop: 15,
    marginBottom: 2,
  },
  dateTextContainer: {
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
