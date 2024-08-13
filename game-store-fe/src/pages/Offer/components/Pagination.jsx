import Pagination from 'react-bootstrap/Pagination';
import getPageNumbers from '../../../utils/getPageNumbers';

function PaginationComponent ({ currentPage, totalPages, goToPage }) {
  if (totalPages === 1) {
    return null;
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => goToPage(1)} />
      <Pagination.Prev onClick={() => goToPage(Math.max(currentPage - 1, 1))} />
      {getPageNumbers(currentPage, totalPages).map((pageNumber, index) => {
        if (pageNumber === '...') {
          return (
            <Pagination.Ellipsis
              key={index}
              onClick={() => goToPage(currentPage)}
            />
          );
        }
        return (
          <Pagination.Item
            key={index}
            active={pageNumber === currentPage}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        );
      })}
      <Pagination.Next
        onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
      />
      <Pagination.Last onClick={() => goToPage(totalPages)} />
    </Pagination>
  );
}

export default PaginationComponent;
