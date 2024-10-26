const paginationPages = (currentPage: number, totalPages: number) => {
  const pages = [];
  const MAX_PAGES_TO_SHOW = 7; // Adjust this if you want to show more or fewer numbers

  if (totalPages <= MAX_PAGES_TO_SHOW) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, "...", totalPages - 1, totalPages);
    } else if (currentPage > totalPages - 4) {
      pages.push(
        1,
        2,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
  }

  return pages;
};

export default paginationPages;
