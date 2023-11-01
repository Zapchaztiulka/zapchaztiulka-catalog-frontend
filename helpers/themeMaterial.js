"use client";
const { createTheme } = require("@mui/material");

export const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          "&:hover": { backgroundColor: "#C6CACD" },
          "&.Mui-selected": {
            backgroundColor: "#D1E9FF",
            fontWeight: 600,
          },
        },
      },
    },
  },
});