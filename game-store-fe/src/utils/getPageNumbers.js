function getPageNumbers(currentPage, totalPages) {
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

export default getPageNumbers;