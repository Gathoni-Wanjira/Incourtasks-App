import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  FETCH_TASKS,
  SET_TASKS,
} from "../models/actionTypes";
import { TaskModel } from "../models/taskModel";
import taskReducer from "./reducers";

const mockTask1: TaskModel = {
  id: 1,
  name: "Task 1 - Take out the trash", // More descriptive name
  description: "Take out the trash to the curb by tonight.",
  createdAt: new Date().toISOString(),
  status: "PENDING",
  dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

const mockTask2: TaskModel = {
  id: 2,
  name: "Task 2 - Finish report",
  description: "Finalize the sales report for Q3.",
  createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  status: "INPROGRESS",
  dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
};

const updatedTask: TaskModel = {
  id: 1,
  name: "Updated Task - Take out recycling", // Updated name
  description: "Updated description: Take out recycling bins to the curb.",
  createdAt: new Date().toISOString(),
  status: "INPROGRESS",
  dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

describe("taskReducer", () => {
  it("should add a new task on ADD_TASK action", () => {
    const initialState: TaskModel[] | undefined = [];
    const expectedState = [mockTask1];

    const action = { type: ADD_TASK, payload: mockTask1 };
    const newState = taskReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it("should edit a task on EDIT_TASK action", () => {
    const initialState = [mockTask1, mockTask2];
    const expectedState = [updatedTask, mockTask2];

    const action = { type: EDIT_TASK, payload: { taskId: 1, updatedTask } };
    const newState = taskReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it("should delete a task on DELETE_TASK action", () => {
    const initialState = [mockTask1, mockTask2];
    const expectedState = [mockTask2];

    const action = { type: DELETE_TASK, payload: 1 };
    const newState = taskReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it("should replace state with tasks on FETCH_TASKS action", () => {
    const mockTasks = [mockTask1, mockTask2];
    const action = { type: FETCH_TASKS, payload: mockTasks };
    const newState = taskReducer([], action); // Start with empty state

    expect(newState).toEqual(mockTasks);
  });

  it("should replace state with tasks on SET_TASKS action", () => {
    const mockTasks = [mockTask1, mockTask2];
    const action = { type: SET_TASKS, payload: mockTasks };
    const newState = taskReducer([], action); // Start with empty state

    expect(newState).toEqual(mockTasks);
  });
});
