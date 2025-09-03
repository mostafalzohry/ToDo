import { TextField, Box, IconButton, InputAdornment } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  const handleClear = () => {
    onSearchChange("");
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 400, position: "relative" }}>
      <TextField
        fullWidth
        placeholder="Search by task title or description"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "text.secondary" }} />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={handleClear}
                edge="end"
                size="small"
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
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
