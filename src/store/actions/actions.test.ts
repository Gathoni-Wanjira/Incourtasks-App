import {
  addTaskToDatabase,
  updateTaskInDatabase,
  deleteTaskFromDatabase,
} from "../../data/database";
import { mockFetchTasksFromDatabase } from "../../data/database.mock";
import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  FETCH_TASKS,
} from "../models/actionTypes";
import { TaskModel } from "../models/taskModel";
import { addTask, editTask, deleteTask, fetchTasks, setTasks } from "./task";

const mockStore = jest.fn();
mockStore.mockReturnValue({ dispatch: jest.fn() });

const mockTask: TaskModel = {
  id: 1,
  name: "New Task",
  description: "Description",
  createdAt: new Date().toISOString(),
  status: "PENDING",
  dueDate: new Date().toISOString(),
};

describe("Redux Actions (without Thunks/Sagas)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("addTask creates ADD_TASK action and calls addTaskToDatabase", () => {
    const store = mockStore();

    addTask(mockTask)(store.dispatch);

    expect(addTaskToDatabase).toHaveBeenCalledWith(mockTask);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: ADD_TASK,
      payload: mockTask,
    });
  });

  it("editTask creates EDIT_TASK action and calls updateTaskInDatabase", () => {
    const store = mockStore();
    const taskId = 1;
    const updatedTask: TaskModel = {
      id: 1,
      name: "Updated Task",
      description: "Description",
      createdAt: new Date().toISOString(),
      status: "PENDING",
      dueDate: new Date().toISOString(),
    };

    editTask(taskId, updatedTask)(store.dispatch)

    expect(updateTaskInDatabase).toHaveBeenCalledWith(taskId, updatedTask);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: EDIT_TASK,
      payload: { taskId, updatedTask },
    });
  });

  it("deleteTask creates DELETE_TASK action and calls deleteTaskFromDatabase", () => {
    const store = mockStore();
    const taskId = 1;

    deleteTask(taskId)(store.dispatch);

    expect(deleteTaskFromDatabase).toHaveBeenCalledWith(taskId);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: DELETE_TASK,
      payload: taskId,
    });
  });

  it("fetchTasks dispatches FETCH_TASKS action", () => {
    const store = mockStore();

    fetchTasks()(store.dispatch);

    expect(mockFetchTasksFromDatabase).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith({ type: FETCH_TASKS });
  });

  it("setTasks updates state with tasks retrieved from database", () => {
    const store = mockStore();
    const mockTasks = [
      {
        id: 1,
        name: "New Task",
        description: "Description",
        createdAt: new Date().toISOString(),
        status: "PENDING",
        dueDate: new Date().toISOString(),
      },
    ];
    mockFetchTasksFromDatabase.mockImplementationOnce((callback) =>
      callback(mockTasks)
    );

    setTasks()(store.dispatch);

    // Access the actual store implementation (replace with yours)
    const state = store.mock.results[0].value;
    expect(state.tasks).toEqual(mockTasks); // Assuming tasks are stored in state.tasks
  });
});
