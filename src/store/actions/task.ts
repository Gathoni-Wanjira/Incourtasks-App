import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  FETCH_TASKS,
  SET_TASKS,
} from "../models/actionTypes";
import { TaskModel } from "../models/taskModel";

export const addTask = (task: TaskModel) => ({
  type: ADD_TASK,
  payload: task,
});

export const editTask = (taskId: number, updatedTask: TaskModel) => ({
  type: EDIT_TASK,
  payload: { taskId, updatedTask },
});

export const deleteTask = (taskId: number) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const fetchTasks = () => ({
  type: FETCH_TASKS,
});

export const setTasks = (tasks: TaskModel[]) => ({
  type: SET_TASKS,
  payload: tasks,
});