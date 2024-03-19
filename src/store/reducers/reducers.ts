import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SET_TASKS,
} from "../models/actionTypes";
import { TaskModel } from "../models/taskModel";

const initialState: TaskModel[] = [];

const taskReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TASK:
      // adding new data to the array
      const newData = [...state, action.payload];
      return newData;
    case EDIT_TASK:
      return state.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, ...action.payload.updatedTask }
          : task
      );
    case DELETE_TASK:
      return state.filter((task) => task.id !== action.payload);
    case SET_TASKS:
      return action.payload;
    default:
      return state;
  }
};

export default taskReducer;