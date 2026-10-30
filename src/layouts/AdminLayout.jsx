import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router";
import { MONO, DISPLAY, CLAY, ROSE } from "../utils/tokens";

/* ── Nav items (data-driven, أقل تكرار) ─────────────── */
const NAV_ITEMS = [
    {
        to: "/admin",
        end: true,
        label: "Overview",
        icon: <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />,
    },
    {
        to: "/admin/posts",
        label: "Posts",
        icon: <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    },
    {
        to: "/admin/comments",
        label: "Comments",
        icon: <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
    },
    {
        to: "/admin/users",
        label: "Users",
        icon: <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
    },
];

const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium border-l-2 transition-colors ${
        isActive
            ? "border-[--clay] text-[--clay] bg-[#faf5ee]"
            : "border-transparent text-stone-600 hover:bg-stone-100"
    }`;

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    /* سدّ الـ drawer أوتوماتيكياً عند تغيير الصفحة */
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    /* Escape يغلق + منع scroll فالموبايل */
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setSidebarOpen(false);
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = sidebarOpen ? "hidden" : "";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [sidebarOpen]);

    const clayVar = { "--clay": CLAY };

    return (
        <div className="flex h-[100dvh] bg-[#fdfbf8] text-stone-800 overflow-hidden font-sans">
            {/* ── Backdrop (mobile) ───────────────────── */}
            <div
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
                className={`fixed inset-0 z-40 bg-stone-900/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
                    sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            />

            {/* ── Sidebar / Drawer ────────────────────── */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#fdfbf8] border-r border-stone-300 flex flex-col
                    transition-transform duration-300 ease-out
                    md:static md:z-auto md:translate-x-0 md:shrink-0
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div
                    className="h-16 flex items-center px-5 sm:px-6 border-b border-stone-300 cursor-pointer shrink-0"
                    onClick={() => navigate("/admin")}
                >
                    <span
                        className="w-7 h-7 flex items-center justify-center border text-[13px] leading-none mr-3 shrink-0"
                        style={{ color: CLAY, borderColor: "#e8dcd0", backgroundColor: "#faf5ee" }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </span>
                    <span className="text-[17px] font-medium text-stone-900 truncate" style={{ fontFamily: DISPLAY }}>
                        لوحة التحكم
                    </span>

                    {/* Close button — mobile only */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        aria-label="إغلاق القائمة"
                        className="ml-auto md:hidden p-1.5 -mr-1.5 text-stone-500 hover:text-stone-900 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 px-3 sm:px-4 py-6 space-y-1 overflow-y-auto overscroll-contain">
                    <p className="px-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2" style={{ fontFamily: MONO }}>
                        Main
                    </p>

                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={navLinkClass}
                            style={clayVar}
                        >
                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {item.icon}
                            </svg>
                            <span className="truncate">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-stone-300 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    <button
                        onClick={() => navigate("/")}
                        className="w-full text-left flex items-center gap-3 px-3 py-2 text-[12px] uppercase tracking-wider text-stone-500 hover:text-[--rose] transition-colors"
                        style={{ fontFamily: MONO, "--rose": ROSE }}
                    >
                        [ Exit Dashboard ]
                    </button>
                </div>
            </aside>

            {/* ── Main Content ────────────────────────── */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-[#fdfbf8] border-b border-stone-300 flex items-center gap-3 px-4 sm:px-6 lg:px-8 shrink-0">
                    {/* Hamburger — mobile only */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        aria-label="فتح القائمة"
                        aria-expanded={sidebarOpen}
                        className="md:hidden p-2 -ml-2 text-stone-600 hover:text-stone-900 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <h1
                        className="text-[13px] sm:text-[16px] lg:text-[20px] font-medium text-stone-900 uppercase tracking-widest truncate"
                        style={{ fontFamily: MONO }}
                    >
                        Admin / Panel
                    </h1>
                </header>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 overscroll-contain">
                    <div className="max-w-6xl mx-auto w-full">
                        {/* هنا فين كتتبدل الصفحات */}
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}