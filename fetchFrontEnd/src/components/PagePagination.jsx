import { Menu, MenuButton,Button, MenuList, MenuItem } from '@chakra-ui/react';
import React, { useState } from 'react';

export function PagePagination({ currentPage, totalPages, onPageChange }) {
  const [pagesBefore, setPagesBefore] = useState(5);
  const [pagesAfter, setPagesAfter] = useState(5);

  const startPage = Math.max(1, currentPage - pagesBefore);
  const endPage = Math.min(totalPages, currentPage + pagesAfter);

  function handlePageChange(page) {
    if (page !== currentPage) {
      onPageChange(page);
    }
  }
// 
// <Menu><Menu/>
  return (
    <>
    {currentPage > 1 && <Button onClick={()=>handlePageChange(currentPage+1)}>Previous</Button>}
    <Menu>
       <MenuButton as={Button}>{currentPage}/{totalPages}</MenuButton>
    <MenuList>
      {startPage > 1 && (
        <>
          <MenuItem onClick={() => handlePageChange(1)}>
            <a>1</a>
          </MenuItem>
          {startPage > 2 && <MenuItem>...</MenuItem>}
        </>
      )}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
        <MenuItem key={page} onClick={() => handlePageChange(page)}>
          <a>{page}</a>
          </MenuItem>
      ))}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <MenuItem>...</MenuItem>}
          <MenuItem onClick={() => handlePageChange(totalPages)}>
            <a>{totalPages}</a>
          </MenuItem>
        </>
      )}
    </MenuList>
    </Menu>
    {currentPage !=totalPages &&  <Button onClick={()=>handlePageChange(currentPage+1)}>Next</Button>}
    </>
  );
}
