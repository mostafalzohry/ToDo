import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "backlog" | "in-progress" | "review" | "done";
  createdAt: string;
}

interface TasksState {
  tasks: Task[];
  searchQuery: string;
}

const initialState: TasksState = {
  tasks: [],
  searchQuery: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setTasks, setSearchQuery } = tasksSlice.actions;
export default tasksSlice.reducer;
