"use client";
const { createTheme } = require("@mui/material");

export const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          maxWidth: '24px',
          minWidth: '24px',
          '&:hover': { backgroundColor: '#C6CACD' },
          '&.Mui-selected': {
            backgroundColor: '#D1E9FF',
            fontWeight: 600,
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '.MuiPagination-ul': {
            flexWrap: 'nowrap',
          },
        },
      },
    },
  },
});