import React, { useEffect, useState } from "react";

const Header = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    //real-time time
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(timeString);    //greetings based on the time
      if (hours < 12) {
        setGreeting("Good morning,");
      } else if (hours < 17) {
        setGreeting("Good afternoon,");
      } else {
        setGreeting("Good evening,");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className="mx-auto bg-gradient-to-br from-teal-600 to-teal-700 min-h-72 text-white "
      style={{
        fontFamily:
          '-apple-system, "SF Pro Text", BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        borderBottomRightRadius: "40px",
        borderBottomLeftRadius: "40px",
      }}
    >
      <div className="flex justify-between items-center p-4 pt-6">
        <span className="font-medium" style={{ fontSize: "12px" }}>
          {currentTime}
        </span>
      </div>
      <div className="px-4 pb-6">
        <div className="flex justify-between items-center mb-6">
          <div style={{ fontFamily: "Inter, sans-serif" }}>
            <p className="text-sm">{greeting}</p>
            <h1 className="text-xl" style={{ fontWeight: "600" }}>
              Mohamed Suhail
            </h1>
          </div>
          <button className="p-2 bg-white/10 hover:bg-white/15 transition-colors rounded-lg border border-white/10">
            <img src="bell 1.png" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
