import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useStore } from './store';

export default function NavBar() {
    const navigate = useNavigate();
    const setAddPopTrue = useStore((set) => set.setAddPopTrue);
    const user = useStore((set)=>set.theUser);
    const logout = useStore((set)=>set.logout);


    const [isOpen, setIsOpen] = useState(false);

    const handleClick = function () {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    const closeMenu = () => setIsOpen(false);

    const handleAddPost = () => {
        setAddPopTrue();
        setIsOpen(false);
    };


    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg border-b border-slate-700/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

                {/* Logo / Brand */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center gap-2 text-xl font-bold text-white no-underline hover:text-cyan-400 transition-colors"
                >
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-md">
                        ✎
                    </span>
                    <span>مدونتي</span>
                </Link>

                {/* Center Links - Desktop */}
                <ul className="hidden md:flex list-none gap-2 m-0 p-0 items-center">
                    <li>
                        <Link
                            to="/"
                            className="text-slate-200 no-underline text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-700/60 hover:text-white transition-all"
                        >
                            الرئيسية
                        </Link>
                    </li>
                    {user && (
                        <li>
                            <Link
                                to={`/profile`}
                                className="text-slate-200 no-underline text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-700/60 hover:text-white transition-all"
                            >
                                الملف الشخصي
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Actions - Desktop */}
                {user && (
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={setAddPopTrue}
                            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
                        >
                            <span className="text-base leading-none">＋</span>
                            اضافة منشور
                        </button>
                        <button
                            onClick={handleClick}
                            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
                        >
                            <span className="text-base leading-none">⏻</span>
                            تسجيل الخروج
                        </button>
                    </div>
                )}

                {!user && (
                    <div className="hidden md:flex items-center gap-2">
                        <Link
                            to="/signIn"
                            className="text-slate-200 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-700/60 transition-all no-underline"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signUp"
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all no-underline active:scale-95"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}

                {/* Hamburger Button - Mobile */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-slate-700/60 transition-colors"
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white rounded my-1.5 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu - Dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-6 py-4 bg-slate-800/95 border-t border-slate-700/50 flex flex-col gap-2">

                    {/* Links */}
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="text-slate-200 no-underline text-sm font-medium px-4 py-3 rounded-lg hover:bg-slate-700/60 hover:text-white transition-all"
                    >
                        🏠 الرئيسية
                    </Link>

                    {user && (
                        <Link
                            to={`/profile`}
                            onClick={closeMenu}
                            className="text-slate-200 no-underline text-sm font-medium px-4 py-3 rounded-lg hover:bg-slate-700/60 hover:text-white transition-all"
                        >
                            👤 الملف الشخصي
                        </Link>
                    )}

                    {/* Divider */}
                    {(user || !user) && (
                        <div className="h-px bg-slate-700/50 my-1"></div>
                    )}

                    {/* Actions */}
                    {user && (
                        <>
                            <button
                                onClick={handleAddPost}
                                className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-4 py-3 rounded-lg text-sm font-semibold shadow-md transition-all active:scale-95"
                            >
                                <span className="text-base leading-none">＋</span>
                                اضافة منشور
                            </button>
                            <button
                                onClick={handleClick}
                                className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white px-4 py-3 rounded-lg text-sm font-semibold shadow-md transition-all active:scale-95"
                            >
                                <span className="text-base leading-none">⏻</span>
                                تسجيل الخروج
                            </button>
                        </>
                    )}

                    {!user && (
                        <>
                            <Link
                                to="/signIn"
                                onClick={closeMenu}
                                className="text-center text-slate-200 hover:text-white text-sm font-medium px-4 py-3 rounded-lg hover:bg-slate-700/60 transition-all no-underline"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signUp"
                                onClick={closeMenu}
                                className="text-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg text-sm font-semibold shadow-md transition-all no-underline active:scale-95"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}