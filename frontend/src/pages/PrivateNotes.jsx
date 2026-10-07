/**
* ============================================================================
* COMPONENT: VÙNG KÍN & BẢO MẬT (PrivateNotes.jsx)
* Author: [Điền tên Frontend Dev]
*
* [LƯU Ý]: Sử dụng lại phần lớn UI từ Notes.jsx. Thêm state isUnlocked để làm "cửa
bảo vệ".
* ============================================================================
*/
import React, { useState, useEffect } from "react";
function PrivateNotes() {
  /* ========================================================================
    VÙNG 1: STATE (Trạng thái)
    ======================================================================== */
  const [isUnlocked, setIsUnlocked] = useState(false); // Cờ khóa màn hình
  const [passwordInput, setPasswordInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    content: "",
  });
  /* ========================================================================
    VÙNG 2: LOGIC (Xác thực & Fetch Data)
    ======================================================================== */
  // Kiểm tra mật khẩu
  const handleLogin = () => {
    fetch("http://localhost:5000/api/private/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: passwordInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsUnlocked(true); // Mở khóa
          fetchPrivateNotes(); // Lấy dữ liệu
        } else {
          alert("Sai mật khẩu, vui lòng thử lại!");
          setPasswordInput("");
        }
      });
  };
  const fetchPrivateNotes = () => {
    fetch("http://localhost:5000/api/private/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  };
  const handleSave = () => {
    const method = formData.id ? "PUT" : "POST";
    const url = formData.id
      ? `http://localhost:5000/api/private/notes/${formData.id}`
      : `http://localhost:5000/api/private/notes`;
    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
      }),
    }).then(() => {
      fetchPrivateNotes();
      setFormData({ id: null, title: "", content: "" });
    });
  };
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa ghi chú này?")) {
      fetch(`http://localhost:5000/api/private/notes/${id}`, {
        method: "DELETE",
      }).then(() => fetchPrivateNotes());
    }
  };
  const handleEdit = (note) =>
    setFormData({
      id: note.id,
      title: note.title,
      content: note.content,
    });
  /* ========================================================================
    VÙNG 3: RENDER (Hiển thị)
    ======================================================================== */
  // 3.1. Nếu chưa mở khóa -> Render màn hình nhập Pass
  if (!isUnlocked) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          {/* Icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 text-3xl dark:bg-cyan-900/40">
            🔒
          </div>

          {/* Title */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Khu vực bảo mật
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Vui lòng nhập mật khẩu để truy cập ghi chú riêng tư
            </p>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Mật khẩu
            </label>

            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Nhập mật khẩu..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3
                         text-slate-800 outline-none transition
                         placeholder:text-slate-400
                         focus:border-cyan-500
                         focus:ring-2 focus:ring-cyan-100
                         dark:border-slate-600
                         dark:bg-slate-800
                         dark:text-slate-100
                         dark:placeholder:text-slate-500
                         dark:focus:border-cyan-400
                         dark:focus:ring-cyan-900/50"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-cyan-600 px-4 py-3
                       font-semibold text-white shadow-md
                       shadow-cyan-600/20 transition
                       hover:bg-cyan-700
                       active:scale-[0.98]
                       dark:bg-cyan-500
                       dark:hover:bg-cyan-600"
          >
            🔓 Mở khóa
          </button>
        </div>
      </div>
    );
  }

  // Nếu đã mở khóa
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-xl dark:bg-cyan-900/40">
              🔐
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Ghi chú riêng tư
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Những ghi chú được bảo vệ của bạn
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
          🔒 Đã mở khóa
        </div>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
        <h3 className="mb-5 text-lg font-semibold text-slate-800 dark:text-slate-100">
          {formData.id ? "Chỉnh sửa ghi chú" : "Tạo ghi chú mới"}
        </h3>

        {/* Title */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Tiêu đề
          </label>

          <input
            placeholder="Tiêu đề bí mật"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3
                       text-slate-800 outline-none transition
                       placeholder:text-slate-400
                       focus:border-cyan-500
                       focus:ring-2 focus:ring-cyan-100
                       dark:border-slate-600
                       dark:bg-slate-800
                       dark:text-slate-100
                       dark:placeholder:text-slate-500
                       dark:focus:border-cyan-400
                       dark:focus:ring-cyan-900/50"
          />
        </div>

        {/* Content */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Nội dung
          </label>

          <textarea
            placeholder="Nội dung bí mật"
            value={formData.content}
            onChange={(e) =>
              setFormData({
                ...formData,
                content: e.target.value,
              })
            }
            rows="5"
            className="w-full resize-none rounded-xl border border-slate-300 bg-white
                       px-4 py-3 text-slate-800 outline-none transition
                       placeholder:text-slate-400
                       focus:border-cyan-500
                       focus:ring-2 focus:ring-cyan-100
                       dark:border-slate-600
                       dark:bg-slate-800
                       dark:text-slate-100
                       dark:placeholder:text-slate-500
                       dark:focus:border-cyan-400
                       dark:focus:ring-cyan-900/50"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={handleSave}
            className="rounded-xl bg-cyan-600 px-5 py-3
                       font-semibold text-white shadow-sm
                       transition hover:bg-cyan-700
                       active:scale-[0.98]
                       dark:bg-cyan-500
                       dark:hover:bg-cyan-600"
          >
            {formData.id ? "✓ Cập nhật" : "+ Thêm ghi chú"}
          </button>

          {formData.id && (
            <button
              onClick={() =>
                setFormData({
                  id: null,
                  title: "",
                  content: "",
                })
              }
              className="rounded-xl border border-slate-300 bg-white
                         px-5 py-3 font-medium text-slate-600
                         transition hover:bg-slate-100
                         active:scale-[0.98]
                         dark:border-slate-600
                         dark:bg-slate-800
                         dark:text-slate-300
                         dark:hover:bg-slate-700"
            >
              Hủy
            </button>
          )}
        </div>
      </div>

      {/* Danh sách */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Danh sách ghi chú
          </h3>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {notes.length} ghi chú
          </span>
        </div>

        {notes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-3 text-4xl">📝</div>

            <h4 className="font-semibold text-slate-700 dark:text-slate-200">
              Chưa có ghi chú
            </h4>

            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
              Hãy tạo ghi chú riêng tư đầu tiên của bạn.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className="group rounded-2xl border border-slate-200
                           bg-white p-5 shadow-sm transition duration-200
                           hover:-translate-y-1 hover:shadow-lg
                           dark:border-slate-700
                           dark:bg-slate-900
                           dark:hover:border-slate-600
                           dark:hover:bg-slate-800"
              >
                {/* Note header */}
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {note.title}
                  </h4>

                  <span className="shrink-0 rounded-lg bg-cyan-50 px-2 py-1 text-xs text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400">
                    🔒
                  </span>
                </div>

                {/* Content */}
                <p className="min-h-[60px] whitespace-pre-wrap break-words text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {note.content}
                </p>

                {/* Actions */}
                <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4 dark:border-slate-700">
                  <button
                    onClick={() => handleEdit(note)}
                    className="rounded-lg bg-slate-100 px-4 py-2
                               text-sm font-medium text-slate-700
                               transition hover:bg-cyan-100
                               hover:text-cyan-700
                               dark:bg-slate-800
                               dark:text-slate-300
                               dark:hover:bg-cyan-900/40
                               dark:hover:text-cyan-400"
                  >
                    ✏️ Sửa
                  </button>

                  <button
                    onClick={() => handleDelete(note.id)}
                    className="rounded-lg bg-red-50 px-4 py-2
                               text-sm font-medium text-red-600
                               transition hover:bg-red-100
                               dark:bg-red-900/30
                               dark:text-red-400
                               dark:hover:bg-red-900/50"
                  >
                    🗑️ Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default PrivateNotes;
