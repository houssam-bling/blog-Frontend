import { NavLink, Outlet, useNavigate } from "react-router";
import { MONO, DISPLAY, CLAY, ROSE } from './tokens';

export default function AdminLayout() {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-[#fdfbf8] text-stone-800 overflow-hidden font-sans">
            {/* ── Sidebar ─────────────────────────────── */}
            <aside className="w-64 bg-[#fdfbf8] border-r border-stone-300 flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-stone-300 cursor-pointer" onClick={() => navigate('/admin')}>
                    <span className="w-7 h-7 flex items-center justify-center border text-[13px] leading-none mr-3" style={{ color: CLAY, borderColor: '#e8dcd0', backgroundColor: '#faf5ee' }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </span>
                    <span className="text-[17px] font-medium text-stone-900" style={{ fontFamily: DISPLAY }}>لوحة التحكم</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    <p className="px-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2" style={{ fontFamily: MONO }}>Main</p>
                    
                    <NavLink to="/admin" end className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium border-l-2 transition-colors ${isActive ? 'border-[--clay] text-[--clay] bg-[#faf5ee]' : 'border-transparent text-stone-600 hover:bg-stone-100'}`} style={{ '--clay': CLAY }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        Overview
                    </NavLink>
                    
                    <NavLink to="/admin/posts" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium border-l-2 transition-colors ${isActive ? 'border-[--clay] text-[--clay] bg-[#faf5ee]' : 'border-transparent text-stone-600 hover:bg-stone-100'}`} style={{ '--clay': CLAY }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Posts
                    </NavLink>

                    <NavLink to="/admin/comments" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium border-l-2 transition-colors ${isActive ? 'border-[--clay] text-[--clay] bg-[#faf5ee]' : 'border-transparent text-stone-600 hover:bg-stone-100'}`} style={{ '--clay': CLAY }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                        Comments
                    </NavLink>

                    <NavLink to="/admin/users" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium border-l-2 transition-colors ${isActive ? 'border-[--clay] text-[--clay] bg-[#faf5ee]' : 'border-transparent text-stone-600 hover:bg-stone-100'}`} style={{ '--clay': CLAY }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        Users
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-stone-300">
                    <button onClick={() => navigate('/')} className="w-full text-left flex items-center gap-3 px-3 py-2 text-[12px] uppercase tracking-wider text-stone-500 hover:text-[--rose] transition-colors" style={{ fontFamily: MONO, '--rose': ROSE }}>
                        [ Exit Dashboard ]
                    </button>
                </div>
            </aside>

            {/* ── Main Content ────────────────────────── */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-[#fdfbf8] border-b border-stone-300 flex items-center justify-between px-6 lg:px-8 shrink-0">
                    <h1 className="text-[20px] font-medium text-stone-900 uppercase tracking-widest" style={{ fontFamily: MONO }}>Admin / Panel</h1>
                </header>
                <div className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <div className="max-w-6xl mx-auto">
                        {/* هنا فين كتتبدل الصفحات */}
                        <Outlet /> 
                    </div>
                </div>
            </main>
        </div>
    );
}