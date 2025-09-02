"use client";

import { Box, Typography, Button, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";
import { TaskCard } from "./task-card";
import type { Task } from "@/lib/features/tasks/tasksSlice";

interface KanbanColumnProps {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onAddTask: (status: Task["status"]) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export function KanbanColumn({
  title,
  status,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: KanbanColumnProps) {
  return (
    <Paper
      sx={{
        p: 2,
        minHeight: 500,
        width: "100%",
        backgroundColor: "background.default",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
        <Button
          size="small"
          startIcon={<Add />}
          onClick={() => onAddTask(status)}
          sx={{ minWidth: "auto", px: 1 }}
        >
          Add
        </Button>
      </Box>

      <Box>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task)}
          />
        ))}
      </Box>
    </Paper>
  );
}
