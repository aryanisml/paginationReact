import { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./Components/Pagination";
import { initialData } from "./Components/Data";

function App() {
  const [currentPageCount, setCurrentPageCount] = useState(1);
  const [currentTotalPageCount, setTotalPageCount] = useState(5);
  const [tableData, setTableData] = useState(initialData);
  

  const previousPage = (event: number) => {
    console.log(event);
    setCurrentPageCount(event);
  };

  const nextPage = (event: number) => {
    console.log(event);
    setCurrentPageCount(event);
  };

  const selectionPageChange = (event: number) => {
    console.log(event);
    setTotalPageCount(event);
  };

  useEffect(()=>{
    const newData = [...initialData];
    if (currentTotalPageCount === currentPageCount * currentTotalPageCount) {
      setTableData(newData.slice(0,currentTotalPageCount));
    }else if(currentPageCount <=currentPageCount * currentTotalPageCount){
      setTableData(newData.slice(5, currentPageCount * currentTotalPageCount ))
    }

  },[currentPageCount, currentTotalPageCount])

  return (
    <>
      <ul>
        {tableData && tableData.length > 1 && 
          tableData.map((value: { id: string; name: string }) => (
            <li key={value.id}>
              {value.id} {value.name}
            </li>
          ))
        }
      </ul>
      <Pagination
        initialPageCount={currentPageCount}
        initialTotalPageCount={currentTotalPageCount}
        onPreviousPage={previousPage}
        onNextPage={nextPage}
        onSelectionPageCount={selectionPageChange}
      />

  
    </>
  );
}

export default App;
