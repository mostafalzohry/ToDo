const API_BASE_URL = "https://68b614cee5dc090291b0d34e.mockapi.io";

export interface ApiTask {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

export const tasksApi = {
  getAllTasks: async (search?: string): Promise<ApiTask[]> => {
    const url = new URL(`${API_BASE_URL}/tasks`);
    if (search) {
      url.searchParams.append("search", search);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      if (response.status === 404) {
        console.log("404 04040 404");
        return [];
      }
      throw new Error("Failed to fetch tasks");
    }
    return response.json();
  },

  getTask: async (id: string): Promise<ApiTask> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    if (!response.ok) throw new Error("Failed to fetch task");
    return response.json();
  },

  createTask: async (
    task: Omit<ApiTask, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiTask> => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return response.json();
  },

  updateTask: async (id: string, task: Partial<ApiTask>): Promise<ApiTask> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        status: task.status,
      }),
    });
    if (!response.ok) throw new Error("Failed to update task");
    return response.json();
  },

  deleteTask: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete task");
  },
};
