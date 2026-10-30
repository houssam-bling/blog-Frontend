import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useStore } from '../store/store';
import { useLogout } from "../hooks/useSign";
import { toast } from "react-hot-toast";
import { useGetProfile } from "../hooks/useUser";

const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const DISPLAY = "'Newsreader', 'Amiri', 'Noto Naskh Arabic', Georgia, serif";
const SANS = "'Noto Sans Arabic', system-ui, -apple-system, sans-serif";

const CLAY = "#b5714d";
const SAGE = "#6b8a6b";
const ROSE = "#b5727a";

export default function NavBar() {
    const navigate = useNavigate();
    const { data: profileData } = useGetProfile();
    const openPostModal = useStore((state) => state.openPostModal);
    const setPostModalMode = useStore((state) => state.setPostModalMode);
    const isLoggedIn = useStore((state) => state.isLoggedIn);
    const clearSelectedPost = useStore((state) => state.clearSelectedPost);
    const clearStoredAuth = useStore((state) => state.clearStoredAuth);
    const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);

    const { mutate: logoutMutation, isPending: isLoggingOut } = useLogout();
    const isAdmin = profileData?.user?.role === "admin";

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        logoutMutation(null, {
            onSuccess: () => {
                toast.success("تم تسجيل الخروج")
                setIsLoggedIn(false)
                clearStoredAuth();
                navigate('/');
                setIsOpen(false);
            },
            onError: () => { toast.error('حدث خطا') },
        });
    };

    const closeMenu = () => setIsOpen(false);

    const handleAddPost = () => {
        setPostModalMode("add");
        clearSelectedPost();
        openPostModal();
        setIsOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-stone-200/80">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

                {/* Brand */}
                <Link to="/" onClick={closeMenu} className="flex items-center gap-2.5 no-underline shrink-0">
                    <span
                        className="w-7 h-7 rounded-md flex items-center justify-center border text-[13px] leading-none"
                        style={{ color: CLAY, borderColor: '#e8dcd0', backgroundColor: '#faf5ee' }}
                        aria-hidden
                    >✎</span>
                    <span className="text-[17px] font-medium text-stone-900" style={{ fontFamily: DISPLAY }}>
                        مدونتي
                    </span>
                </Link>

                {/* Center links (desktop) */}
                <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
                    <li>
                        <Link
                            to="/"
                            className="px-3 py-1.5 rounded-md text-[13px] text-stone-600 hover:text-stone-900 hover:bg-stone-50 no-underline transition-colors"
                            style={{ fontFamily: SANS }}
                        >الرئيسية</Link>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <Link
                                to="/profile"
                                className="px-3 py-1.5 rounded-md text-[13px] text-stone-600 hover:text-stone-900 hover:bg-stone-50 no-underline transition-colors"
                                style={{ fontFamily: SANS }}
                            >الملف الشخصي</Link>
                        </li>
                    )}
                    {isAdmin && (<li>
                            <Link
                                to="/admin"
                                className="px-3 py-1.5 rounded-md text-[13px] text-stone-600 hover:text-stone-900 hover:bg-stone-50 no-underline transition-colors"
                                style={{ fontFamily: SANS }}
                            > لوحة التحكم</Link>
                    </li>)}
                    
                </ul>

                {/* Actions (desktop) */}
                {isLoggedIn && (
                    <div className="hidden md:flex items-center gap-2 shrink-0">
                        <button
                            onClick={handleAddPost}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-[12px] font-medium border transition-colors hover:brightness-[0.97]"
                            style={{ fontFamily: SANS, color: SAGE, borderColor: '#d8e2d4', backgroundColor: '#f5f8f3' }}
                        >
                            <span className="text-[14px] leading-none">+</span>
                            اضافة منشور
                        </button>
                        <button
                            onClick={handleClick}
                            disabled={isLoggingOut}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-[12px] font-medium border border-transparent hover:bg-[#fbf1ee] transition-colors disabled:opacity-60"
                            style={{ fontFamily: SANS, color: ROSE }}
                        >
                            <span className="text-[14px] leading-none">⏻</span>
                            {isLoggingOut ? '...' : 'تسجيل الخروج'}
                        </button>

                    </div>
                )}

                {!isLoggedIn && (
                    <div className="hidden md:flex items-center gap-2 shrink-0">
                        <Link
                            to="/signIn"
                            className="px-3.5 py-1.5 rounded-md text-[12px] text-stone-600 hover:text-stone-900 hover:bg-stone-50 no-underline transition-colors"
                            style={{ fontFamily: MONO, letterSpacing: '0.02em' }}
                        >Sign In</Link>
                        <Link
                            to="/signUp"
                            className="px-3.5 py-1.5 rounded-md text-[12px] font-medium bg-stone-800 text-white hover:bg-stone-900 no-underline transition-colors"
                            style={{ fontFamily: MONO, letterSpacing: '0.04em' }}
                        >Sign Up</Link>
                    </div>
                )}

                {/* Hamburger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.25 rounded-md hover:bg-stone-50 transition-colors shrink-0"
                    aria-label="Toggle menu"
                >
                    <span className={`block w-4 h-px bg-stone-800 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                    <span className={`block w-4 h-px bg-stone-800 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-4 h-px bg-stone-800 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </button>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 py-4 border-t border-stone-100 bg-white flex flex-col gap-1">
                    <Link to="/" onClick={closeMenu} className="px-3 py-2.5 rounded-md text-[13px] text-stone-700 hover:bg-stone-50 no-underline transition-colors" style={{ fontFamily: SANS }}>الرئيسية</Link>
                    {isLoggedIn && <Link to="/profile" onClick={closeMenu} className="px-3 py-2.5 rounded-md text-[13px] text-stone-700 hover:bg-stone-50 no-underline transition-colors" style={{ fontFamily: SANS }}>الملف الشخصي</Link>}

                    <div className="h-px bg-stone-100 my-2" />

                    {isLoggedIn && (
                        <>
                            <button
                                onClick={handleAddPost}
                                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md text-[13px] font-medium border transition-colors"
                                style={{ fontFamily: SANS, color: SAGE, borderColor: '#d8e2d4', backgroundColor: '#f5f8f3' }}
                            >
                                <span className="text-[14px] leading-none">+</span>
                                اضافة منشور
                            </button>
                            <button
                                onClick={handleClick}
                                disabled={isLoggingOut}
                                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md text-[13px] font-medium hover:bg-[#fbf1ee] transition-colors disabled:opacity-60"
                                style={{ fontFamily: SANS, color: ROSE }}
                            >
                                <span className="text-[14px] leading-none">⏻</span>
                                {isLoggingOut ? '...' : 'تسجيل الخروج'}
                            </button>
                        </>
                    )}

                    {!isLoggedIn && (
                        <>
                            <Link to="/signIn" onClick={closeMenu} className="px-3 py-2.5 rounded-md text-[13px] text-stone-700 hover:bg-stone-50 no-underline text-center transition-colors" style={{ fontFamily: MONO }}>Sign In</Link>
                            <Link to="/signUp" onClick={closeMenu} className="px-3 py-2.5 rounded-md text-[13px] font-medium bg-stone-800 text-white hover:bg-stone-900 no-underline text-center transition-colors" style={{ fontFamily: MONO }}>Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}