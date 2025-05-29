import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import BalanceCard from "./components/BalanceCard";
import TransactionHistory from "./components/TransactionHistory";
import BottomNavigation from "./components/BottomNavigation";

function App() {
  const [currentMonth, setCurrentMonth] = useState("");
  useEffect(() => {
    const latestDate = new Date();
    const current = latestDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    setCurrentMonth(current);
  }, []);
  return (
    <>
      <Header />
      <BalanceCard
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <TransactionHistory currentMonth={currentMonth} />
      <BottomNavigation />
    </>
  );
}

export default App;
