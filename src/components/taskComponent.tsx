import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextTopography } from "../utils/textTopograhy";
import { TextFontFamily } from "../utils/fontFamily";
import useAppTheme, { mapStateToColor } from "../utils/colors";
import Ii from "react-native-vector-icons/Ionicons";
import React from "react";
import { TaskModel } from "../store/models/taskModel";
import moment from "moment";

interface TaskComponentProps {
  onPress?: () => void;
  item: TaskModel;
}

export const TaskComponent: React.FC<TaskComponentProps> = ({
  item,
  onPress,
}: TaskComponentProps) => {
  const colors = useAppTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.taskContainer,
        {
          backgroundColor: colors.white,
        },
      ]}
    >
      {/* icon container */}
      <View style={styles.iconContainer}>
        <Ii name="documents" size={25} />
      </View>
      {/* text container */}
      <View style={styles.textContainer}>
        <Text style={[TextTopography.h5]}>{item.name}</Text>
        {/* actions container */}
        <View style={styles.actionsContainer}>
          <Text
            style={[
              TextTopography.caption,
              {
                ...TextFontFamily.light,
                color: colors.mutedText,
              },
            ]}
          >
            {moment(item.dueDate).format("YYYY-MM-DD")}
          </Text>
          <View
            style={[
              styles.stateContainer,
              {
                backgroundColor: mapStateToColor(item.status).muted,
              },
            ]}
          >
            <Text
              style={[
                TextTopography.caption,
                {
                  color:  mapStateToColor(item.status).color,
                  fontWeight: '700',
                  textTransform: "uppercase",
                },
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    // marginHorizontal: 15,
    marginVertical: 7,
    borderRadius: 5,
    paddingVertical: 5,
    // paddingHorizontal: 10,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  iconContainer: {
    marginHorizontal: 15,
  },
  textContainer: {
    flexGrow: 1,
    flexDirection: "column",
  },
  actionsContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginRight: 10,
    marginTop: 7,
    marginBottom: 3,
  },
  stateContainer: {
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});
