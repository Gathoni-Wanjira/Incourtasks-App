import { useLocalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  Appbar,
  TextInput,
  Button,
  Snackbar,
  HelperText,
} from "react-native-paper";
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
import * as Yup from "yup";
import { Formik } from "formik";

interface FormValues {
  name: string | undefined;
  description: string | undefined;
  dueDate: Date | undefined;
  status: string;
}

const EditTaskchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  dueDate: Yup.date().required("Required"),
  status: Yup.string().required("Required"),
});

export const EditScreen = () => {
  const dispatch = useDispatch();
  const { item } = useLocalSearchParams();
  const colors = useAppTheme();
  const router = useRouter();

  const [showPicker, setShowPicker] = useState<boolean>(false);

  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  // handlers
  const handleCancel = () => {
    router.back();
  };

  const handleEdit = (values: FormValues) => {
    try {
      const payload = JSON.parse((item as string) ?? "{}") as TaskModel;
      const newPayload: TaskModel = {
        ...payload,
        // check if null if not update our "object"
        ...(values.name != null && {
          name: values.name,
        }),
        // check if null if not update our "object"
        ...(values.description != null && {
          description: values.description,
        }),
        // update due date
        ...(values.dueDate != null && {
          dueDate: values.dueDate.toISOString(),
        }),
        // status can't be null at this point
        status: values.status,
      };
      if (payload.id) {
        dispatch(editTask(payload.id, newPayload) as unknown as UnknownAction);
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
      <Formik
        initialValues={
          {
            name: (JSON.parse((item as string) ?? "{}") as TaskModel).name,
            description: (JSON.parse((item as string) ?? "{}") as TaskModel)
              .description,
            dueDate: new Date(
              (JSON.parse((item as string) ?? "{}") as TaskModel).dueDate
            ),
            status: (JSON.parse((item as string) ?? "{}") as TaskModel).status,
          } as FormValues
        }
        onSubmit={handleEdit}
        validationSchema={EditTaskchema}
      >
        {({ handleChange, handleSubmit, errors, values, setFieldValue }) => (
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text>Name</Text>
            <TextInput
              mode="outlined"
              outlineColor={colors.primary}
              activeOutlineColor={colors.primary}
              value={values.name}
              onChangeText={handleChange("name")}
            />
            {errors.name && (
              <HelperText type="error" visible={true}>
                {errors.name}
              </HelperText>
            )}
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
                selectedValue={values.status}
                onValueChange={(itemValue, itemIndex) =>
                  setFieldValue("status", itemValue)
                }
              >
                {STATES.map((e) => {
                  return (
                    <Picker.Item
                      key={e.value}
                      label={e.label}
                      value={e.value}
                    />
                  );
                })}
              </Picker>
            </View>
            {errors.status && (
              <HelperText type="error" visible={true}>
                {errors.status}
              </HelperText>
            )}
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
                {values.dueDate ? (
                  <Text style={styles.dateText}>
                    {values.dueDate.toDateString()}
                  </Text>
                ) : (
                  <></>
                )}
                {showPicker && (
                  <DateTimePicker
                    value={values.dueDate ?? new Date()}
                    mode={"date"}
                    minimumDate={new Date()}
                    onTouchCancel={() => {
                      setShowPicker(false);
                    }}
                    onTouchEnd={() => {
                      setShowPicker(false);
                    }}
                    onChange={(_: DateTimePickerEvent, date?: Date) => {
                      setShowPicker(false);
                      setFieldValue("dueDate", date);
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
            {errors.dueDate && (
              <HelperText type="error" visible={true}>
                {errors.dueDate}
              </HelperText>
            )}
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
              value={values.description}
              onChangeText={handleChange("description")}
            />
            {errors.description && (
              <HelperText type="error" visible={true}>
                {errors.description}
              </HelperText>
            )}

            <Button
              mode="contained"
              buttonColor={colors.orange}
              textColor={colors.mutedText}
              style={styles.addButton}
              onPress={() => {
                handleSubmit();
              }}
            >
              EDIT TASK
            </Button>
            <Button
              mode="outlined"
              textColor={colors.mutedText}
              onPress={handleCancel}
            >
              CANCEL
            </Button>
          </ScrollView>
        )}
      </Formik>
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
