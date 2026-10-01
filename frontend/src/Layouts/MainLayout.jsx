import { Outlet , Link ,NavLink } from "react-router-dom";
function MainLayout(){
    return <>
       <div className="min-h-screen bg-slate-100">
    <header className="mx-auto mt-4 flex w-[90%] max-w-5xl items-center justify-between rounded-2xl bg-cyan-600 px-8 py-4 shadow-lg">
        
        {/* Logo */}
        <Link
            to="/"
            className="text-xl font-bold text-white transition hover:text-cyan-100"
        >
            MyNotes
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
            <Link
                to="/"
                className="rounded-lg px-4 py-2 font-medium text-white transition hover:bg-cyan-700"
            >
                Home
            </Link>

            <Link
                to="/Notes"
                className="rounded-lg px-4 py-2 font-medium text-white transition hover:bg-cyan-700"
            >
                Notes
            </Link>

            <Link
                to="/PrivateNotes"
                className="rounded-lg px-4 py-2 font-medium text-white transition hover:bg-cyan-700"
            >
                Private Notes
            </Link>
        </nav>
    </header>

    <main className="mx-auto w-[90%] max-w-5xl py-6">
        <Outlet />
    </main>
</div>

    </>
}

export default MainLayout;