import React, { useEffect, useState, useRef, useCallback } from "react";
import allTransactions from "../data/expenses.json";

const ITEMS_PER_LOAD = 5;

const TransactionHistory = ({ currentMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  const [category, setCategory] = useState("All");
  const [filtered, setFiltered] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const loaderRef = useRef(null);

  const categories = [
    "All",
    ...new Set(allTransactions.map((tx) => tx.category)),
  ];

  useEffect(() => {
    const filtered = allTransactions.filter((tx) => {
      const txMonth = new Date(tx.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      return txMonth === currentMonth && tx.type === "expense";
    });
    setTransactions(filtered);
  }, [currentMonth]);

  useEffect(() => {
    let temp = [...transactions];
    if (category !== "All") {
      temp = temp.filter((tx) => tx.category === category);
    }
    if (sortOrder === "asc") {
      temp.sort((a, b) => a.amount - b.amount);
    } else if (sortOrder === "desc") {
      temp.sort((a, b) => b.amount - a.amount);
    }
    setFiltered(temp);
    setVisibleCount(ITEMS_PER_LOAD); 
  }, [transactions, category, sortOrder]);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setVisibleCount((prev) =>
          Math.min(prev + ITEMS_PER_LOAD, filtered.length)
        );
      }
    },
    [filtered.length]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  return (
    <div className="mt-7 ml-5 mr-5" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">Expenses</p>
      </div>

      <div className="flex gap-3 mb-4 mt-1.5">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-sm px-2 py-1 border border-black/10 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="text-sm px-2 py-1 border border-black/10 rounded"
        >
          <option value="none">Sort by Amount</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div className="flex-col mt-4 space-y-2">
        {filtered.slice(0, visibleCount).map((t) => (
          <li
            key={t.id}
            className="flex justify-between text-base pb-2 font-medium"
          >
            <div>
              <span className="flex">{t.name}</span>
              <span className="font-normal text-sm text-gray-500">
                {t.date}
              </span>
            </div>
            <span className="font-semibold text-lg text-red-600">
              -${t.amount}
            </span>
          </li>
        ))}
        {visibleCount < filtered.length && (
          <div
            ref={loaderRef}
            className="text-center py-3 text-sm text-gray-400"
          >
         loading
          </div>
        )}
        {visibleCount >= filtered.length && filtered.length > 0 && (
          <div className="text-center py-3 text-sm text-gray-400">
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
