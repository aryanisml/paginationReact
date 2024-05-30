// import { useEffect, useState, useRef } from "react";
// import '../App.css';

// interface Product {
//   description: string;
//   thumbnail: string;
// }

// const InfiniteScroll = () => {
//   const [data, setData] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const pageRef = useRef(0); // Use a ref to track the page value
//   const loadingRef = useRef(false); // Ref to track loading state

//   useEffect(() => {
//     fetchData();
//     const debouncedHandleScroll = debounce(handleScroll, 200);
//     window.addEventListener('scroll', debouncedHandleScroll);

//     return () => window.removeEventListener('scroll', debouncedHandleScroll);
//   }, []);

//   const handleScroll = () => {
//     if (loadingRef.current) return;
//     const scrollThreshold = 300;
//     console.log('window innerHeight', window.innerHeight);
//     console.log('window scrollY', window.scrollY);
//     console.log('document.body.offsetHeight', document.body.offsetHeight);
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - scrollThreshold) {
//       fetchData();
//     }
//   };

//   const debounce = (func: Function, wait: number) => {
//     let timeout: NodeJS.Timeout;
//     return (...args: any[]) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func(...args), wait);
//     };
//   };

//   const fetchData = async () => {
//     if (loadingRef.current) return;
//     setLoading(true);
//     loadingRef.current = true;

//     try {
//       const result = await fetch(`https://dummyjson.com/products?limit=10&skip=${pageRef.current}`);
//       const response = await result.json();
//       setData((prev) => [...prev, ...response.products]);
//       pageRef.current += 10; // Increment the pageRef value
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//     } finally {
//       setLoading(false);
//       loadingRef.current = false;
//     }
//   };

//   return (
//     <>
//       <div>
//         <ul>
//           {data && data.length > 0 && data.map((value: Product, index) => (
//             <li key={index}>
//               <p>{value.description}</p>
//               <img src={value.thumbnail} alt={value.description} style={{ width: "200px", height: "200px" }} />
//             </li>
//           ))}
//         </ul>
//         {loading && <div className="spinner">Loading...</div>}
//       </div>
//     </>
//   );
// };

// export default InfiniteScroll;

import { useEffect, useState, useRef } from "react";
import '../App.css';

interface Product {
  description: string;
  thumbnail: string;
}

const InfiniteScroll = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(0); // Use a ref to track the page value
  const loadingRef = useRef(false); // Ref to track loading state
  const divRef = useRef<HTMLDivElement>(null); // Ref for the scrollable div

  useEffect(() => {
    fetchData();
    const divElement = divRef.current;
    if (divElement) {
      const debouncedHandleScroll = debounce(handleScroll, 200);
      divElement.addEventListener('scroll', debouncedHandleScroll);

      return () => divElement.removeEventListener('scroll', debouncedHandleScroll);
    }
  }, []);

  const handleScroll = () => {
    if (loadingRef.current) return;
    const scrollThreshold = 100; // Adjust as needed
    const divElement = divRef.current;
    console.log('scroll Y', divElement?.scrollTop);
    console.log('inner height', divElement?.clientHeight);
    console.log('offset height ', divElement?.scrollHeight)
    if (divElement && divElement.scrollTop + divElement.clientHeight >= divElement.scrollHeight - scrollThreshold) {
      fetchData();
    }
  };

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const fetchData = async () => {
    if (loadingRef.current) return;
    setLoading(true);
    loadingRef.current = true;

    try {
      const result = await fetch(`https://dummyjson.com/products?limit=10&skip=${pageRef.current}`);
      const response = await result.json();
      setData((prev) => [...prev, ...response.products]);
      pageRef.current += 10; // Increment the pageRef value
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  return (
    <>
      <div ref={divRef} style={{ height: "400px", overflowY: "scroll" }}>
        <ul>
          {data && data.length > 0 && data.map((value: Product, index) => (
            <li key={index}>
              <p>{value.description}</p>
              <img src={value.thumbnail} alt={value.description} style={{ width: "200px", height: "200px" }} />
            </li>
          ))}
        </ul>
        {loading && <div className="spinner">Loading...</div>}
      </div>
    </>
  );
};

export default InfiniteScroll;

