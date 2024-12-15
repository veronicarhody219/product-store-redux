import React, { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";
const ThemedLayout = ({ children }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
        color: theme === "light" ? "#000" : "#073410",
        minHeight: "100vh",
      }}
    >
      <button onClick={toggleTheme} className="theme-toggle-btn">
        ToggleTheme
      </button>
      {children}
    </div>
  );
};
export default ThemedLayout;
