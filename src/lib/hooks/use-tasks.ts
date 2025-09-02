import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/lib/hooks";
import { setTasks } from "@/lib/features/tasks/tasksSlice";
import { tasksApi, type ApiTask } from "@/lib/api/tasks";
import { useEffect } from "react";
import type { Task } from "@/lib/features/tasks/tasksSlice";
import { useSnackbarContext } from "@/components/snackbar-provider";

const mapApiTaskToTask = (apiTask: ApiTask): Task => ({
  id: apiTask.id,
  title: apiTask.title,
  description: apiTask.description,
  status: apiTask.status as Task["status"],
  createdAt: apiTask.createdAt,
});

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useSnackbarContext();

  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: tasksApi.getAllTasks,
  });

  useEffect(() => {
    if (tasksQuery.data) {
      const mappedTasks = tasksQuery.data.map(mapApiTaskToTask);
      dispatch(setTasks(mappedTasks));
    }
  }, [tasksQuery.data, dispatch]);

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
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    error: tasksQuery.error,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
};
