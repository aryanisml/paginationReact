import { useState } from "react";

interface PaginationProps {
  initialPageCount: number;
  initialTotalPageCount: number;
  onPreviousPage?: (pageNumber: number) => void;
  onNextPage?: (pageNumber: number) => void;
  onSelectionPageCount?: (pageNumber: number) => void;
}

const Pagination = ({
  initialPageCount,
  initialTotalPageCount: initalTotalPageCount,
  onPreviousPage,
  onNextPage,
  onSelectionPageCount,
}: PaginationProps) => {
  const [totalPageCount, setTotalPageCount] = useState(initalTotalPageCount);

  const [currentPage, SetCurrentPage] = useState(initialPageCount);

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTotalPageCount(()=> {
        const num = Number(event.target.value)
        if (onSelectionPageCount) {
            onSelectionPageCount(num);
          }
          return num;
    
    });
   
  };
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      SetCurrentPage((prev) => {
        const newPage = prev - 1;
        if (onPreviousPage) {
          onPreviousPage(newPage);
        }
        return newPage;
      });
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPageCount) {
        SetCurrentPage((prev) => {
            const newPage = prev + 1;
            if (onNextPage) {
                onNextPage(newPage);
            }
            return newPage;
          });
    }
  };

  return (
    <>
      <select value={totalPageCount} onChange={handleSelectionChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
      </select>
      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        {"<<"}
      </button>
      <input type="text" value={currentPage} readOnly />
      <button onClick={goToNextPage} disabled={currentPage*totalPageCount >=totalPageCount +5 }>
        {">>"}
      </button>
    </>
  );
};

export default Pagination;
