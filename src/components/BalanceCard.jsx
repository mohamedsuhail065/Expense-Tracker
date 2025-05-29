import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import transactionshistory from "../data/expenses.json";

const BalanceCard = ({ currentMonth, setCurrentMonth }) => {
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState(0);

  const generateLast12Months = () => {
    const months = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(
        d.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      );
    }
    return months.reverse();
  };

  const months = generateLast12Months();

  useEffect(() => {
    const filtered = transactionshistory.filter((tx) => {
      const txMonth = new Date(tx.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      return txMonth === currentMonth && tx.type === "expense";
    });
    const total = filtered.reduce((sum, tx) => sum + tx.amount, 0);
    setExpense(total);
    setTransactions(filtered.length);
  }, [currentMonth]);

  const currentIndex = months.indexOf(currentMonth);

  const handlePrevMonth = () => {
    if (currentIndex > 0) {
      const prevMonth = months[currentIndex - 1];
      setCurrentMonth(prevMonth);
    }
  };

  const handleNextMonth = () => {
    if (currentIndex < months.length - 1) {
      const nextMonth = months[currentIndex + 1];
      setCurrentMonth(nextMonth);
    }
  };

  return (
    <div
      className="bg-teal-700 min-h-48 ml-5 mr-5 rounded-lg backdrop-blur-sm p-6 border border-white/20"
      style={{ marginTop: "-130px", fontFamily: "Inter, sans-serif" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-0.5">
          <span
            className="text-base text-white"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Monthly Expenses
          </span>
          <button
            onClick={handlePrevMonth}
            disabled={currentIndex <= 0}
            className="p-1 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronUp size={16} color="white" />
          </button>
          <button
            onClick={handleNextMonth}
            disabled={currentIndex >= months.length - 1}
            className="p-1 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronDown size={16} color="white" />
          </button>
        </div>
        <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <MoreHorizontal size={21} color="white" />
        </button>
      </div>

      <div className="text-3xl text-white font-bold mb-8">
        ${expense.toFixed(2)}
      </div>

      <div className="flex justify-between mb-2">
        <div className="flex items-center font-medium">
          <p className="text-base text-white opacity-75">{currentMonth}</p>
        </div>
        <p className="text-base text-white opacity-75">
          {transactions} transactions
        </p>
      </div>
    </div>
  );
};

export default BalanceCard;
