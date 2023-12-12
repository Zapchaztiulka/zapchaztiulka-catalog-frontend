import Pagination from '@mui/material/Pagination';
import { ThemeProvider } from '@mui/material';
import { scrollToTop } from '@/helpers/scrollToTop';
import { theme } from '@/helpers/themeMaterial';
import { useRouter } from 'next/router';

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
