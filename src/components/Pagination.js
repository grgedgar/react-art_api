import { useEffect } from "react";
import { StyledEngineProvider } from '@mui/material/styles';
import PaginationCore from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Pagination({ page, setPage, pagesTotal, pageIsLoaded, setPageIsLoaded, openItem, notFoundIsOpen }) {
  
  useEffect(() => {
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.pushState({}, "", url)
  }, [page])
  
  const handlePageChange = (e) => {
    e.preventDefault();
    if(e.target.innerText == page) {
      return ;
    }
    setPageIsLoaded(false);
    if(e.target.getAttribute('aria-label') == 'Go to next Page' || e.target.getAttribute('data-testid') == 'NavigateNextIcon' || e.target.getAttribute('d') == 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z') {
      setPage(page + 1);
    } else if(e.target.getAttribute('aria-label') == 'Go to previous Page' || e.target.getAttribute('data-testid') == 'NavigateBeforeIcon' || e.target.getAttribute('d') == 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z') {
      setPage(page - 1);
    } else if(!isNaN(e.target.innerText)) {
      setPage(Number(e.target.innerText));
    }
  };

 
  if (pageIsLoaded && !openItem && !notFoundIsOpen) {
    return (
      <StyledEngineProvider injectFirst>
        <Stack spacing={2}>
          <PaginationCore variant="outlined" page={page} count={pagesTotal} onChange={handlePageChange} />
        </Stack>
      </StyledEngineProvider>
    );
  }
}

export default Pagination;