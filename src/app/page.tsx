"use client";

import { Box, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { KanbanBoard } from "@/components/kanban-board";
import { TaskFormDialog } from "@/components/task-form-dialog";
import { useTasks } from "@/lib/hooks/use-tasks";
import { DeleteTaskDialog } from "@/components/delete-task-dialog";
import { Loading } from "@/components/loading";
import { NoResults } from "@/components/no-results";
import { Task } from "@/lib/types/task";

export default function HomePage() {
  const {
    tasks,
    isLoading,
    searchQuery,
    setSearchQuery,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<Task["status"]>("backlog");

  const handleAddTask = (status: Task["status"]) => {
    setDefaultStatus(status);
    setEditingTask(null);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleDeleteTask = (task: Task) => {
    setDeletingTask(task);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingTask) {
      deleteTask(deletingTask.id);
      setDeletingTask(null);
    }
  };

  const handleSubmitTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    if (editingTask) {
      updateTask({
        id: editingTask.id,
        task: taskData,
      });
    } else {
      createTask(taskData);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  if (isLoading) {
    return <Loading message="Loading tasks..." />;
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          backgroundColor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Kanban Board
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleAddTask("backlog")}
        >
          Add Task
        </Button>
      </Box>

      <Box sx={{ p: 3, pb: 0 }}>
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </Box>

      {searchQuery && tasks.length === 0 ? (
        <NoResults
          searchQuery={searchQuery}
          onClearSearch={handleClearSearch}
        />
      ) : (
        <KanbanBoard
          tasks={tasks}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      )}

      <TaskFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmitTask}
        task={editingTask}
        defaultStatus={defaultStatus}
      />

      <DeleteTaskDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        taskTitle={deletingTask?.title || ""}
      />
    </Box>
  );
}
