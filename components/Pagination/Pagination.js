import Pagination from '@mui/material/Pagination';
import { scrollToTop } from '@/helpers/scrollToTop';
import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
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

const PaginationProducts = ({
  pagesCount,
  products,
  handleChange,
  currentPage,
  size,
}) => {

const router = useRouter();
   
  return (
    <div>
      {products && pagesCount > 1 && (
        <ThemeProvider theme={theme}>
          <div className="flex justify-center relative">
            <Pagination
              shape="rounded"
              count={pagesCount}
              siblingCount={1}
              boundaryCount={size > 480 ? 2 : 1}
              page={router.query.page ? currentPage : 1}
              onChange={handleChange}
              onClick={scrollToTop}
            />
          </div>
        </ThemeProvider>
      )}
    </div>
  );
};

export default PaginationProducts;
