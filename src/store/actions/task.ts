import { Dispatch } from "react";
import {
  addTaskToDatabase,
  updateTaskInDatabase,
  deleteTaskFromDatabase,
  fetchTasksFromDatabase,
} from "../../data/database";
import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  FETCH_TASKS,
  SET_TASKS,
} from "../models/actionTypes";
import { TaskModel } from "../models/taskModel";

export const addTask = (task: TaskModel) => {
  return (dispatch: Dispatch<any>) => {
    addTaskToDatabase(task); // Add task to the database
    dispatch({ type: ADD_TASK, payload: task });
  };
};

export const editTask = (taskId: number, updatedTask: TaskModel) => {
  return (dispatch: Dispatch<any>) => {
    updateTaskInDatabase(taskId, updatedTask); // Update task in the database
    dispatch({ type: EDIT_TASK, payload: { taskId, updatedTask } });
  };
};

export const deleteTask = (taskId: number) => {
  return (dispatch: Dispatch<any>) => {
    deleteTaskFromDatabase(taskId); // Delete task from the database
    dispatch({ type: DELETE_TASK, payload: taskId });
  };
};

export const fetchTasks = () => {
  return (dispatch: Dispatch<any>) => {
    fetchTasksFromDatabase((tasks) => {
      // Fetch tasks from the database
      dispatch({ type: FETCH_TASKS, payload: tasks });
    });
  };
};

export const setTasks = () => {
  return (dispatch: Dispatch<any>) => {
    fetchTasksFromDatabase((tasks) => {
      // Fetch tasks from the database
      dispatch({ type: SET_TASKS, payload: tasks });
    });
  };
};
