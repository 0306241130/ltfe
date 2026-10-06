import React, { useState, useEffect } from "react";

import { useTheme } from "../context/ThemeContext";
function Settings() {
  const { theme, setTheme } = useTheme();
  const { profile, setProfile } = useTheme();
  
  //useEffect(() => setProfile({ ...profile, theme: theme }), [theme]);

  //Lấy dữ liệu khi vừa load trang
  //   useEffect(() => {
  //     fetch("http://localhost:5000/api/profile")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setProfile(data);
  //         // Đổi màu nền tạm thời dựa theo theme
  //         document.body.style.backgroundColor =
  //           data.theme === "dark" ? "#333" : "#fff";
  //         document.body.style.color = data.theme === "dark" ? "#fff" : "#000";
  //       });
  //   }, []);
  // Hàm xử lý khi gõ vào Input
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  // Hàm xử lý Lưu thay đổi
  const handleSave = () => {
    console.log(theme, "setting.jsx");
    console.log(profile , 'handleSave');
    fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Lưu thành công!");
        console.log(data,'sau khi luu');
        setTheme(profile.theme);
      });
  };

  return (
    <div
      className="
    min-h-screen
    px-4 py-8
    sm:px-6 lg:px-8
    rounded-2xl
    transition-colors duration-300
  "
    >
      <div className="mx-auto max-w-2xl">
        {/* Card */}
        <div
          className="
        rounded-2xl
        bg-white
        p-6
        shadow-lg
        transition-colors duration-300
        sm:p-8

        dark:border
        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-black/20
      "
        >
          {/* Tiêu đề */}
          <div className="mb-8">
            <h2
              className="
            text-2xl font-bold
            text-gray-800
            sm:text-3xl

            dark:text-white
          "
            >
              Cài đặt hệ thống
            </h2>

            <p
              className="
            mt-2 text-sm
            text-gray-500
            dark:text-gray-400
          "
            >
              Quản lý thông tin cá nhân và giao diện hệ thống
            </p>
          </div>

          {/* Tên hiển thị */}
          <div className="mb-5">
            <label
              htmlFor="displayName"
              className="
            mb-2 block
            text-sm font-medium
            text-gray-700
            dark:text-gray-200
          "
            >
              Tên hiển thị
            </label>

            <input
              id="displayName"
              name="displayName"
              type="text"
              value={profile.displayName}
              onChange={handleChange}
              className="
            w-full
            rounded-lg
            border
            border-gray-300
            bg-white
            px-4 py-3
            text-gray-800
            outline-none
            transition

            placeholder:text-gray-400

            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200

            dark:border-slate-600
            dark:bg-slate-800
            dark:text-white
            dark:placeholder:text-slate-500
            dark:focus:border-blue-400
            dark:focus:ring-blue-900/50
          "
              placeholder="Nhập tên hiển thị"
            />
          </div>

          {/* Giao diện */}
          <div className="mb-5">
            <label
              htmlFor="theme"
              className="
            mb-2 block
            text-sm font-medium
            text-gray-700
            dark:text-gray-200
          "
            >
              Giao diện
            </label>

            <select
              id="theme"
              name="theme"
              value={profile.theme}
              onChange={(e) =>
                setProfile({ ...profile, theme: e.target.value })
              }
              className="
            w-full
            rounded-lg
            border
            border-gray-300
            bg-white
            px-4 py-3
            text-gray-800
            outline-none
            transition

            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200

            dark:border-slate-600
            dark:bg-slate-800
            dark:text-white
            dark:focus:border-blue-400
            dark:focus:ring-blue-900/50
          "
            >
              <option value="light">☀️ Sáng</option>
              <option value="dark">🌙 Tối</option>
            </select>
          </div>

          {/* Mật khẩu */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="
            mb-2 block
            text-sm font-medium
            text-gray-700
            dark:text-gray-200
          "
            >
              Mật khẩu vùng kín
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="
            w-full
            rounded-lg
            border
            border-gray-300
            bg-white
            px-4 py-3
            text-gray-800
            outline-none
            transition

            placeholder:text-gray-400

            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200

            dark:border-slate-600
            dark:bg-slate-800
            dark:text-white
            dark:placeholder:text-slate-500
            dark:focus:border-blue-400
            dark:focus:ring-blue-900/50
          "
              placeholder="Nhập mật khẩu"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSave}
            className="
          w-full
          rounded-lg
          bg-blue-600
          px-5 py-3
          font-semibold
          text-white
          shadow-sm
          transition

          hover:bg-blue-700
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-2
          active:scale-[0.98]

          sm:w-auto

          dark:bg-blue-500
          dark:hover:bg-blue-600
          dark:focus:ring-blue-400
          dark:focus:ring-offset-slate-900
        "
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
export default Settings;
