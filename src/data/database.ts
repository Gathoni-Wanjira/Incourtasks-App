import * as SQLite from "expo-sqlite";
import { TaskModel } from "../store/models/taskModel";

const db = SQLite.openDatabase("tasks.db");

// create table
// NOTE: used date in the format of isoString to remove db dates issues
export const setupDatabase = () => {
  db.transaction(
    // callback
    (tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, status TEXT, dueDate TEXT, createdAt TEXT)"
      );
    },
    // error callback
    (err) => {
      console.log("Err", err);
    },
    () => {
      console.log("Database setup");
    }
  );
};

export const addTaskToDatabase = (task: TaskModel) => {
  try {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO tasks (name, description, status, dueDate, createdAt) VALUES (?, ?, ?, ?, ?)",
          [
            task.name,
            task.description,
            task.status,
            task.dueDate,
            task.createdAt,
          ]
        );
      },
      (err) => {
        console.log("Error adding", err);
        throw err;
      },
      () => {
        console.log("Added task successful");
      }
    );
  } catch (e) {
    throw e;
  }
};

export const fetchTasksFromDatabase = (
  callback: (tasks: TaskModel[]) => void
) => {
  try {
    db.transaction(
      (tx) => {
        tx.executeSql("SELECT * FROM tasks", [], (_, { rows }) => {
          // console.log(rows);
          const tasks: TaskModel[] = rows._array.map((row: any) => ({
            id: row.id,
            name: row.name,
            description: row.description,
            status: row.status,
            dueDate: row.dueDate,
            createdAt: row.createdAt,
          }));
          callback(tasks);
        });
      },
      (err) => {
        console.log("Error fetching", err);
        throw err;
      },
      () => {
        console.log("Fetching task successful");
      }
    );
  } catch (e) {
    throw e;
  }
};

export const updateTaskInDatabase = (
  taskId: number,
  updatedTask: TaskModel
) => {
  try {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "UPDATE tasks SET name = ?, description = ?, status = ?, dueDate = ? WHERE id = ?",
          [
            updatedTask.name,
            updatedTask.description,
            updatedTask.status,
            updatedTask.dueDate,
            taskId,
          ]
        );
      },
      (err) => {
        console.log("Error updating", err);
        throw err;
      },
      () => {
        console.log("Updated task successful");
      }
    );
  } catch (e) {
    throw e;
  }
};

export const deleteTaskFromDatabase = (taskId: number) => {
  try {
    db.transaction(
      (tx) => {
        tx.executeSql("DELETE FROM tasks WHERE id = ?", [taskId]);
      },
      (err) => {
        console.log("Error deleting", err);
        throw err;
      },
      () => {
        console.log("Deleted task successful");
      }
    );
  } catch (e) {
    throw e;
  }
};
