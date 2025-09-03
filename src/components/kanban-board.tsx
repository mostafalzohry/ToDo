"use client";

import { Box } from "@mui/material";
import { KanbanColumn } from "./kanban-column";
import { useAppSelector } from "@/lib/hooks";
import type { Task } from "@/lib/features/tasks/tasksSlice";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { useTasks } from "@/lib/hooks/use-tasks";
import { useState } from "react";
import { TaskCard } from "./task-card";

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
  const { tasks } = useAppSelector((state) => state.tasks);
  const { updateTask } = useTasks();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = active.id as string;
    const task = tasks.find((t) => t.id === taskId);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    // Find the task being dragged
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    // Update the task status - send only the changed fields
    updateTask({
      id: taskId,
      task: {
        status: newStatus, // Only send the status field that changed
      },
    });
  };

  const tasksByStatus = {
    backlog: tasks.filter((task) => task.status === "backlog"),
    "in-progress": tasks.filter((task) => task.status === "in-progress"),
    review: tasks.filter((task) => task.status === "review"),
    done: tasks.filter((task) => task.status === "done"),
  };

  const columns = [
    { title: "Backlog", status: "backlog" as const },
    { title: "In Progress", status: "in-progress" as const },
    { title: "Review", status: "review" as const },
    { title: "Done", status: "done" as const },
  ];

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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

      <DragOverlay>
        {activeTask ? (
          <Box
            sx={{
              transform: "rotate(5deg)",
              opacity: 0.8,
              width: "100%",
              maxWidth: 280,
            }}
          >
            <TaskCard
              task={activeTask}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
