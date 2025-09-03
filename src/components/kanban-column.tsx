"use client";

import { Box, Typography, Button, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";
import { TaskCard } from "./task-card";
import { useDroppable } from "@dnd-kit/core";
import { Task } from "@/lib/types/task";

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
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        p: 2,
        minHeight: 400,
        width: "100%",
        backgroundColor: isOver ? "primary.50" : "background.default",
        border: isOver ? 2 : 1,
        borderColor: isOver ? "primary.300" : "divider",
        borderStyle: isOver ? "dashed" : "solid",
        borderRadius: 2,
        transition: "all 0.2s ease-in-out",
        transform: isOver ? "scale(1.01)" : "scale(1)",
        boxShadow: isOver ? 2 : 1,
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
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </Box>
    </Paper>
  );
}
