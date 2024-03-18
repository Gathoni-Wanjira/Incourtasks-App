import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Appbar, TextInput, Button } from "react-native-paper";
import useAppTheme from "../utils/colors";

export const AddTaskScreen = () => {
  const colors = useAppTheme();
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Add Task" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <TextInput
          label="Name"
          mode="outlined"
          outlineColor={colors.primary}
          activeOutlineColor={colors.primary}
          //   value={text}
          //   onChangeText={(text) => setText(text)}
        />
        <TextInput
          label="Description"
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
        <Button
          mode="contained"
          buttonColor={colors.orange}
          textColor={colors.mutedText}
          style={styles.addButton}
          onPress={() => {
            router.replace('home');
          }}
        >
          ADD TASK
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
  addButton: {
    marginTop: 15,
  }
});
