export const mockAddTaskToDatabase = jest.fn();
export const mockUpdateTaskInDatabase = jest.fn();
export const mockDeleteTaskFromDatabase = jest.fn();
export const mockFetchTasksFromDatabase = jest.fn((callback) => callback([])); // Replace with sample tasks if needed

// Reset mocks before each test
beforeEach(() => {
  mockAddTaskToDatabase.mockClear();
  mockUpdateTaskInDatabase.mockClear();
  mockDeleteTaskFromDatabase.mockClear();
  mockFetchTasksFromDatabase.mockClear();
});
