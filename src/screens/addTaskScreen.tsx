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
import {
  Appbar,
  TextInput,
  Button,
  Snackbar,
  HelperText,
} from "react-native-paper";
import useAppTheme from "../utils/colors";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { TaskModel } from "../store/models/taskModel";
import { addTask } from "../store/actions/task";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { UnknownAction } from "@reduxjs/toolkit";
import { Formik } from "formik";
import * as Yup from "yup";

interface FormValues {
  name: string | undefined;
  description: string | undefined;
  dueDate: Date | undefined;
}

const AddTaskchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  dueDate: Yup.date().required("Required"),
});

export const AddTaskScreen = () => {
  const colors = useAppTheme();
  const router = useRouter();

  // state
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  // redux
  const dispatch = useDispatch();

  const submitForm = (values: FormValues) => {
    try {
      const newData: TaskModel = {
        id: Math.random(),
        name: values.name!,
        description: values.description!,
        status: "PENDING",
        dueDate: values.dueDate!.toISOString(),
        createdAt: new Date().toISOString(),
      };
      // console.log("data", newData);
      dispatch(addTask(newData) as unknown as UnknownAction);
      setVisible(true);
      setMessage("Added task successfully");
      setTimeout(()=>{
        router.back()
      }, 1500);
    } catch (e) {
      setVisible(true);
      setMessage("Error adding tasks");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Add Task" />
      </Appbar.Header>
      <Formik
        initialValues={
          {
            name: undefined,
            description: undefined,
            dueDate: undefined,
          } as FormValues
        }
        onSubmit={submitForm}
        validationSchema={AddTaskchema}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          values,
          setFieldValue,
        }) => (
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
            <Text>Description</Text>
            <TextInput
              mode="outlined"
              multiline={true}
              style={{
                height: 150,
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
                // keyboard dismiss
                Keyboard.dismiss();
                handleSubmit();
              }}
            >
              ADD TASK
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
