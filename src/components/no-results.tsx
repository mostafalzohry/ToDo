import { Box, Typography, Button } from "@mui/material";
import { SearchOff } from "@mui/icons-material";

interface NoResultsProps {
  searchQuery: string;
  onClearSearch: () => void;
}

export function NoResults({ searchQuery, onClearSearch }: NoResultsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 2,
        textAlign: "center",
      }}
    >
      <SearchOff sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        No results found for {searchQuery}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Try adjusting your search terms or check for typos.
      </Typography>
      <Button variant="outlined" onClick={onClearSearch}>
        Clear Search
      </Button>
    </Box>
  );
}
