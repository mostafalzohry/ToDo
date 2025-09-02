"use client";

import { Box } from "@mui/material";
import { KanbanColumn } from "./kanban-column";
import { useAppSelector } from "@/lib/hooks";
import type { Task } from "@/lib/features/tasks/tasksSlice";

interface KanbanBoardProps {
  onAddTask: (status: Task["status"]) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export function KanbanBoard({
  onAddTask,
  onEditTask,
  onDeleteTask,
}: KanbanBoardProps) {
  const { tasks, searchQuery } = useAppSelector((state) => state.tasks);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tasksByStatus = {
    backlog: filteredTasks.filter((task) => task.status === "backlog"),
    "in-progress": filteredTasks.filter(
      (task) => task.status === "in-progress"
    ),
    review: filteredTasks.filter((task) => task.status === "review"),
    done: filteredTasks.filter((task) => task.status === "done"),
  };

  const columns = [
    { title: "Backlog", status: "backlog" as const },
    { title: "In Progress", status: "in-progress" as const },
    { title: "Review", status: "review" as const },
    { title: "Done", status: "done" as const },
  ];

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          width: "100%",
          minHeight: "500px",
        }}
      >
        {columns.map((column) => (
          <Box key={column.status} sx={{ flex: 1, minWidth: 0 }}>
            <KanbanColumn
              title={column.title}
              status={column.status}
              tasks={tasksByStatus[column.status]}
              onAddTask={onAddTask}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
