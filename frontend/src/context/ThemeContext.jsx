import React, { createContext, useContext, useEffect, useState } from "react";
import { data } from "react-router-dom";

// 1. Tạo Context
const ThemeContext = createContext();

// 2. Tạo Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [profile, setProfile] = useState(data);
  // Lấy profile từ API khi ứng dụng khởi động
  useEffect(() => {
    fetch("http://localhost:5000/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setTheme(data.theme);
        setProfile(data);
      })
      .catch((error) => {
        console.error("Không thể lấy profile:", error);
      });
  }, [profile]);

  // Mỗi khi theme thay đổi
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, profile, setProfile }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Custom hook
export const useTheme = () => {
  return useContext(ThemeContext);
};
