import json from "../utils/DB-Offer-simul.json";

export const getOffers = async (pageNumber) => {
  return new Promise((resolve, reject) => {
    const currentPage = pageNumber || 1;
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = json.slice(startIndex, endIndex);
    const totalPages = Math.ceil(json.length / itemsPerPage);

    setTimeout(() => {
      resolve({
        data: paginatedData,
        totalPages: totalPages,
        currentPage: currentPage,
      });
    }, 1500);
  });
};