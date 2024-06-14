import { useEffect, useState } from "react";
import _ from "lodash";
import apiClient from "../../utils/api_client";
import ProductCard from "./ProductCard";
import useData from "../../hooks/useData";

import { useSearchParams } from "react-router-dom";
import Pagination from "../common/Pagination";
import { ProdCardSkeleton } from "./ProdCardSkeleton";

function ProductsList() {
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const searchQuery = search.get("search");
  const [sortBy, setSortBy] = useState("");
  const [sortedProduct, setSortedProduct] = useState([]);
  // const page = search.get('page')
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        search: searchQuery,
        category,
        page,
        perPage: 6,
      },
    },
    [searchQuery, category, page]
  );
  useEffect(() => {
    setPage(1);
  }, [searchQuery, category]);
  // const handlePageChange = (page) => {
  //   const currentParams = Object.fromEntries(search)
  //   setSearch({ ...currentParams, page: page })
  // }

  const handlePageChange = () => {
    // const currentParams = Object.fromEntries(search)
    setPage((prev) => prev + 1);
    // setSearch({ ...currentParams, page: page + 1 })
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isLoading &&
        page &&
        page < data.totalPages
      ) {
        handlePageChange();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, isLoading]);

  useEffect(() => {
    const helpSorting = (products) => {
      const [prop, order] = sortBy.split(" ");
      const iteratee = (obj) =>
        order.trim() === "asc" ? obj[prop] : -obj[prop];
      setSortedProduct(_.sortBy(products, iteratee));
    };
    if (data && data.products) {
      const products = [...data.products];
      if (sortBy.trim() === "") {
        setSortedProduct(products);
      } else {
        helpSorting(products);
      }
    }
  }, [sortBy, data]);

  return (
    <section>
      <header className="flex items-center justify-between px-5">
        <h2 className="text-2xl font-bold">Products</h2>
        <select
          name="sort"
          className="text-lg font-medium h-9 py-1 border-none outline-none rounded-[5px]"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price High to Low</option>
          <option value="price asc">Price Low to High</option>
          <option value="rate desc">Rate High to Low</option>
          <option value="rate asc">Rate Low to High</option>
        </select>
      </header>
      <div className="p-2 pl-7 flex justify-evenly items-center flex-wrap">
        {error && <em className="text-red-400">{error}</em>}
        {data?.products &&
          sortedProduct?.map((p) => <ProductCard key={p._id} product={p} />)}

        {isLoading &&
          Array(6)
            .fill(0)
            .map((skCard, idx) => <ProdCardSkeleton key={idx} />)}
      </div>
      {/* {data?.totalProducts && (
        <Pagination
          totalPosts={data?.totalProducts}
          handlePageChange={handlePageChange}
          postPerPage={8}
          currentPage={page}
        />
      )} */}
    </section>
  );
}
export default ProductsList;
