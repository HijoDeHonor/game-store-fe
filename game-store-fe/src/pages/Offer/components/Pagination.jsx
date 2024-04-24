import React from "react";
import Pagination from "react-bootstrap/Pagination";

function PaginationComponent({ currentPage, totalPages, goToPage }) {
  if (totalPages === 1) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    const pageNumbers = [1];

    if (left > 2) pageNumbers.push("...");

    for (let i = left; i <= right; i++) {
      pageNumbers.push(i);
    }

    if (right < totalPages - 1) pageNumbers.push("...");
    pageNumbers.push(totalPages);

    return pageNumbers;
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => goToPage(1)} />
      <Pagination.Prev
        onClick={() => goToPage(Math.max(currentPage - 1, 1))}
      />
      {getPageNumbers().map((pageNumber, index) => {
        if (pageNumber === "...") {
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

