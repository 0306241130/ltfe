import { Outlet, Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
function MainLayout() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <>
      <div
        className="
    min-h-screen
    bg-slate-50
    text-slate-900
    transition-colors duration-300
    dark:bg-slate-950
    dark:text-slate-100
  "
      >
        {/* Header */}
        <header
          className="
      sticky top-0 z-50
      border-b
      border-slate-200
      bg-white/90
      backdrop-blur
      transition-colors duration-300

      dark:border-slate-800
      dark:bg-slate-900/90
    "
        >
          <div className="mx-auto flex min-h-[72px] w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3">
              <div
                className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            bg-cyan-600
            text-lg font-bold text-white
            shadow-md shadow-cyan-600/20
            transition duration-300
            group-hover:scale-105
            group-hover:bg-cyan-700

            dark:bg-cyan-500
            dark:group-hover:bg-cyan-400
          "
              >
                M
              </div>

              <div>
                <h1
                  className="
              text-lg font-bold tracking-tight
              text-slate-800
              dark:text-white
            "
                >
                  MyNotes
                </h1>

                <p
                  className="
              hidden text-xs
              text-slate-400
              sm:block
              dark:text-slate-500
            "
                >
                  Your personal notes
                </p>
              </div>
            </Link>

            {/* Navigation */}
            <nav
              className="
          flex items-center gap-1
          rounded-xl
          bg-slate-100
          p-1
          transition-colors duration-300

          dark:bg-slate-800
        "
            >
              <Link
                to="/"
                className="
            rounded-lg
            px-3 py-2
            text-sm font-medium
            transition-all duration-200

            text-slate-600
            hover:bg-white
            hover:text-cyan-600
            hover:shadow-sm

            dark:text-slate-300
            dark:hover:bg-slate-700
            dark:hover:text-cyan-400

            sm:px-4
          "
              >
                Profile
              </Link>

              <Link
                to="/Notes"
                className="
            rounded-lg
            px-3 py-2
            text-sm font-medium
            transition-all duration-200

            text-slate-600
            hover:bg-white
            hover:text-cyan-600
            hover:shadow-sm

            dark:text-slate-300
            dark:hover:bg-slate-700
            dark:hover:text-cyan-400

            sm:px-4
          "
              >
                Notes
              </Link>

              <Link
                to="/PrivateNotes"
                className="
            rounded-lg
            px-3 py-2
            text-sm font-medium
            transition-all duration-200

            text-slate-600
            hover:bg-white
            hover:text-cyan-600
            hover:shadow-sm

            dark:text-slate-300
            dark:hover:bg-slate-700
            dark:hover:text-cyan-400

            sm:px-4
          "
              >
                <span className="hidden sm:inline">Private Notes</span>

                <span className="sm:hidden">Private</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Main */}
        <main
          className="
      mx-auto
      w-full
      max-w-6xl
      px-4 py-6
      sm:px-6 sm:py-8
      lg:px-8
    "
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default MainLayout;
