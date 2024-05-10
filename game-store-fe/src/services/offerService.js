import json from "../utils/DB-Offer-simul.json";
//import constants from "../constants";
export const getOffers = /* async*/ (pageNumber, pages) => {
  const currentPage = pageNumber || 1;
  const itemsPerPage = 10;

//   try {
//     const res = await fetch(URL, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (!res.ok) {
//       throw new Error("Error en la petición");
//     }
    const data = /* await res.json();*/ json; // load simulated data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if (pages) {
      const totalPages = Math.ceil(data.length / itemsPerPage);
      console.log(totalPages, "total de paginas");
      return totalPages;
    }
    if (!pages) {
      const paginatedData = data.slice(startIndex, endIndex);
      console.log(paginatedData, "data paginada");
      return paginatedData;
    }
//   } catch (error) {
//     console.log("Error en la petición: ", error);
//     return []; // return empty object
//   }
};

// restore all the comented code when the back end is ready