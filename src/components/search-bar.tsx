"use client";

import { TextField, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSearchQuery } from "@/lib/features/tasks/tasksSlice";

export function SearchBar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.tasks.searchQuery);

  return (
    <Box sx={{ width: "100%", maxWidth: 400 }}>
      <TextField
        fullWidth
        placeholder="Search by task title or description"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        InputProps={{
          startAdornment: <Search sx={{ color: "text.secondary", mr: 1 }} />,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "background.paper",
            "& fieldset": {
              borderColor: "divider",
            },
          },
        }}
      />
    </Box>
  );
}
