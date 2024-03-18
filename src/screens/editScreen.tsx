import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import { Appbar, TextInput, Button } from "react-native-paper";
import useAppTheme from "../utils/colors";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export const EditScreen = () => {
  const colors = useAppTheme();
  const router = useRouter();

  const [status, setStatus] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Edit Task" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text>Name</Text>
        <TextInput
          // label="Name"
          mode="outlined"
          outlineColor={colors.primary}
          activeOutlineColor={colors.primary}
          //   value={text}
          //   onChangeText={(text) => setText(text)}
        />
        <View style={styles.spacer} />
        <Text>Description</Text>
        <TextInput
          // label="Description"
          mode="outlined"
          multiline={true}
          style={{
            minHeight: 100,
          }}
          outlineColor={colors.primary}
          activeOutlineColor={colors.primary}
          //   value={text}
          //   onChangeText={(text) => setText(text)}
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
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
        <Button
          mode="contained"
          buttonColor={colors.orange}
          textColor={colors.mutedText}
          style={styles.addButton}
          onPress={() => {
            router.replace("home");
          }}
        >
          EDIT TASK
        </Button>
        <Button
          mode="outlined"
          // buttonColor={colors.orange}
          textColor={colors.mutedText}
          onPress={() => {
            router.replace("home");
          }}
        >
          CANCEL
        </Button>
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
});
