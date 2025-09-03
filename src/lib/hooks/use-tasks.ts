import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi, type ApiTask } from "@/lib/api/tasks";
import { useState } from "react";
import { useSnackbarContext } from "@/components/snackbar-provider";
import { useDebounce } from "./use-debounce";
import { Task } from "../types/task";

const mapApiTaskToTask = (apiTask: ApiTask): Task => ({
  id: apiTask.id,
  title: apiTask.title,
  description: apiTask.description,
  status: apiTask.status as Task["status"],
  createdAt: apiTask.createdAt,
});

export const useTasks = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useSnackbarContext();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 600); // 300ms delay

  const tasksQuery = useQuery({
    queryKey: ["tasks", debouncedSearchQuery],
    queryFn: () => tasksApi.getAllTasks(debouncedSearchQuery),
  });

  const createTaskMutation = useMutation({
    mutationFn: tasksApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      showSuccess("Task created successfully!");
    },
    onError: () => {
      showError("Failed to create task");
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, task }: { id: string; task: Partial<ApiTask> }) =>
      tasksApi.updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      showSuccess("Task updated successfully!");
    },
    onError: () => {
      showError("Failed to update task");
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: tasksApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      showSuccess("Task deleted successfully!");
    },
    onError: () => {
      showError("Failed to delete task");
    },
  });

  return {
    tasks: tasksQuery.data ? tasksQuery.data.map(mapApiTaskToTask) : [],
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    error: tasksQuery.error,
    searchQuery,
    setSearchQuery,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
};
