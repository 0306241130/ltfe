/**
 * ============================================================================
 * COMPONENT: GIAO DIỆN QUẢN LÝ GHI CHÚ (Notes.jsx)
 * Author: [Điền tên Frontend Dev]
 *
 * [CẢNH BÁO TRÁNH XUNG ĐỘT]:
 * - Vùng 1 & 2 (State & Logic): Chỉ người phụ trách tích hợp API mới được sửa.
 * - Vùng 3 (Render UI): Các bạn phụ trách CSS/HTML có thể tùy chỉnh ở đây.
 * ============================================================================
 */
import React, { useState, useEffect } from "react";
function Notes() {
  /* ========================================================================
    VÙNG 1: KHỞI TẠO STATE (Trạng thái dữ liệu)
    ======================================================================== */
  const [topic, setTopic] = useState("hoc-tap");
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    content: "",
  });
  /* ========================================================================
    VÙNG 2: XỬ LÝ LOGIC & GỌI API (Fetch, Save, Delete)
    ======================================================================== */
  const fetchNotes = () => {
    fetch(`http://localhost:5000/api/notes/${topic}`)
      .then((res) => res.json())
      .then((data) => setNotes(data));
  };
  useEffect(() => {
    fetchNotes();
  }, [topic]);
  const handleSave = () => {
    const method = formData.id ? "PUT" : "POST";
    const url = formData.id
      ? `http://localhost:5000/api/notes/${topic}/${formData.id}`
      : `http://localhost:5000/api/notes/${topic}`;
    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchNotes();
        setFormData({ id: null, title: "", content: "" });
      });
  };
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa ghi chú này?")) {
      fetch(`http://localhost:5000/api/notes/${topic}/${id}`, {
        method: "DELETE",
      }).then(() => fetchNotes());
    }
  };
  const handleEdit = (note) =>
    setFormData({
      id: note.id,
      title: note.title,
      content: note.content,
    });
  /* ========================================================================
    VÙNG 3: RENDER GIAO DIỆN (UI/CSS)
    ======================================================================== */
  return (
    <div
      className="
      space-y-6
      text-slate-900
      dark:text-slate-100
    "
    >
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
            flex h-11 w-11 items-center justify-center
            rounded-xl
            bg-blue-100
            text-xl
            dark:bg-blue-900/40
          "
          >
            📝
          </div>

          <div>
            <h2
              className="
              text-2xl font-bold
              text-slate-800
              dark:text-slate-100
            "
            >
              Ghi chú công khai
            </h2>

            <p
              className="
              text-sm
              text-slate-500
              dark:text-slate-400
            "
            >
              Quản lý những ghi chú của bạn
            </p>
          </div>
        </div>

        <div
          className="
          rounded-full
          bg-blue-50
          px-4 py-2
          text-sm font-medium
          text-blue-600
  
          dark:bg-blue-900/30
          dark:text-blue-400
        "
        >
          🌐 Công khai
        </div>
      </div>

      {/* Chọn chủ đề */}
      <div
        className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-colors duration-300
  
        sm:p-6
  
        dark:border-slate-700
        dark:bg-slate-900
      "
      >
        <label
          htmlFor="topic"
          className="
          mb-2 block
          text-sm font-semibold
          text-slate-700
          dark:text-slate-200
        "
        >
          Chủ đề ghi chú
        </label>

        <select
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4 py-3
          text-slate-700
          outline-none
          transition
  
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
  
          sm:max-w-xs
  
          dark:border-slate-600
          dark:bg-slate-800
          dark:text-slate-200
          dark:focus:border-blue-400
          dark:focus:ring-blue-900/40
        "
        >
          <option value="hoc-tap">📚 Học tập</option>
          <option value="cong-viec">💼 Công việc</option>
          <option value="ca-nhan">👤 Cá nhân</option>
        </select>
      </div>

      {/* Form */}
      <div
        className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-colors duration-300
  
        sm:p-6
  
        dark:border-slate-700
        dark:bg-slate-900
      "
      >
        <div className="mb-5">
          <h3
            className="
            text-lg font-bold
            text-slate-800
            dark:text-slate-100
          "
          >
            {formData.id ? "Chỉnh sửa ghi chú" : "Thêm ghi chú mới"}
          </h3>

          <p
            className="
            mt-1 text-sm
            text-slate-500
            dark:text-slate-400
          "
          >
            {formData.id
              ? "Cập nhật nội dung ghi chú của bạn"
              : "Tạo một ghi chú mới để lưu lại thông tin"}
          </p>
        </div>

        {/* Tiêu đề */}
        <div className="mb-4">
          <label
            className="
            mb-2 block
            text-sm font-medium
            text-slate-700
            dark:text-slate-200
          "
          >
            Tiêu đề
          </label>

          <input
            placeholder="Nhập tiêu đề..."
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4 py-3
            text-slate-800
            outline-none
            transition
  
            placeholder:text-slate-400
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
  
            dark:border-slate-600
            dark:bg-slate-800
            dark:text-slate-100
            dark:placeholder:text-slate-500
            dark:focus:border-blue-400
            dark:focus:ring-blue-900/40
          "
          />
        </div>

        {/* Nội dung */}
        <div className="mb-5">
          <label
            className="
            mb-2 block
            text-sm font-medium
            text-slate-700
            dark:text-slate-200
          "
          >
            Nội dung
          </label>

          <textarea
            placeholder="Nhập nội dung ghi chú..."
            value={formData.content}
            onChange={(e) =>
              setFormData({
                ...formData,
                content: e.target.value,
              })
            }
            rows="5"
            className="
            w-full
            resize-none
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4 py-3
            text-slate-800
            outline-none
            transition
  
            placeholder:text-slate-400
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
  
            dark:border-slate-600
            dark:bg-slate-800
            dark:text-slate-100
            dark:placeholder:text-slate-500
            dark:focus:border-blue-400
            dark:focus:ring-blue-900/40
          "
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={handleSave}
            className="
            rounded-xl
            bg-blue-600
            px-5 py-3
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-blue-700
            active:scale-[0.98]
  
            dark:bg-blue-500
            dark:hover:bg-blue-600
          "
          >
            {formData.id ? "✓ Cập nhật" : "+ Thêm mới"}
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
              className="
              rounded-xl
              border
              border-slate-300
              bg-white
              px-5 py-3
              font-medium
              text-slate-600
              transition
              hover:bg-slate-100
              active:scale-[0.98]
  
              dark:border-slate-600
              dark:bg-slate-800
              dark:text-slate-300
              dark:hover:bg-slate-700
            "
            >
              Hủy
            </button>
          )}
        </div>
      </div>

      {/* Danh sách */}
      <div>
        {/* Tiêu đề danh sách */}
        <div className="mb-4 flex items-center justify-between">
          <h3
            className="
            text-lg font-bold
            text-slate-800
            dark:text-slate-100
          "
          >
            Danh sách ghi chú
          </h3>

          <span
            className="
            rounded-full
            bg-slate-100
            px-3 py-1
            text-sm
            text-slate-500
  
            dark:bg-slate-800
            dark:text-slate-400
          "
          >
            {notes.length} ghi chú
          </span>
        </div>

        {/* Không có dữ liệu */}
        {notes.length === 0 && (
          <div
            className="
            rounded-2xl
            border
            border-dashed
            border-slate-300
            bg-white
            p-10
            text-center
  
            dark:border-slate-700
            dark:bg-slate-900
          "
          >
            <div className="mb-3 text-4xl">📝</div>

            <h4
              className="
              font-semibold
              text-slate-700
              dark:text-slate-200
            "
            >
              Chưa có ghi chú nào
            </h4>

            <p
              className="
              mt-1 text-sm
              text-slate-400
              dark:text-slate-500
            "
            >
              Hãy tạo ghi chú đầu tiên của bạn.
            </p>
          </div>
        )}

        {/* Cards */}
        {notes.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-200
  
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg
  
                dark:border-slate-700
                dark:bg-slate-900
                dark:hover:border-blue-700
                dark:hover:bg-slate-800
              "
              >
                {/* Card header */}
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h4
                    className="
                    break-words
                    text-lg font-bold
                    text-slate-800
                    dark:text-slate-100
                  "
                  >
                    {note.title}
                  </h4>

                  <span
                    className="
                    shrink-0
                    rounded-lg
                    bg-blue-50
                    px-2 py-1
                    text-xs
                    text-blue-600
  
                    dark:bg-blue-900/30
                    dark:text-blue-400
                  "
                  >
                    📝
                  </span>
                </div>

                {/* Content */}
                <p
                  className="
                  min-h-[60px]
                  whitespace-pre-wrap
                  break-words
                  text-sm
                  leading-6
                  text-slate-600
  
                  dark:text-slate-300
                "
                >
                  {note.content}
                </p>

                {/* Actions */}
                <div
                  className="
                  mt-5
                  flex gap-2
                  border-t
                  border-slate-100
                  pt-4
  
                  dark:border-slate-700
                "
                >
                  <button
                    onClick={() => handleEdit(note)}
                    className="
                    rounded-lg
                    bg-slate-100
                    px-4 py-2
                    text-sm font-medium
                    text-slate-700
                    transition
  
                    hover:bg-blue-100
                    hover:text-blue-700
  
                    dark:bg-slate-800
                    dark:text-slate-300
                    dark:hover:bg-blue-900/40
                    dark:hover:text-blue-400
                  "
                  >
                    ✏️ Sửa
                  </button>

                  <button
                    onClick={() => handleDelete(note.id)}
                    className="
                    rounded-lg
                    bg-red-50
                    px-4 py-2
                    text-sm font-medium
                    text-red-600
                    transition
  
                    hover:bg-red-100
  
                    dark:bg-red-900/20
                    dark:text-red-400
                    dark:hover:bg-red-900/40
                  "
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
export default Notes;
