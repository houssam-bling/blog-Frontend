import { useGetAllPosts } from './usePost'
import LoadingPage from "./loadingPage";
import ErrorPage from "./errorPage";
import Post from "./post";
import { useState,useEffect } from "react";

const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const SERIF = "'Newsreader', 'Instrument Serif', Georgia, serif";

const CLAY = "#b5714d";
const AMBER = "#c99a4a";

export default function HomePage() {

    const [page,setPage] = useState(1)
    const { data, isLoading, isError, error } = useGetAllPosts({page:page,limit:5})
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [page]);
    if (isLoading) { return <LoadingPage /> }
    if (isError) { return <ErrorPage message={error.message} /> }

    const posts = data.Posts || [];
    const isEmpty = posts.length === 0;
    const totalPages = data.TotalPages;

    
    return (
        <div className="min-h-screen bg-white text-stone-800">
            <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16">

                {/* ── Masthead ─────────────────────────────── */}
                <header className="mb-10">
                    <div className="flex items-baseline gap-3 mb-3">
                        <span
                            className="text-[10px] uppercase tracking-[0.28em] font-bold"
                            style={{ fontFamily: MONO, color: CLAY }}
                        >
                            The Feed
                        </span>
                        <span
                            className="h-px flex-1 self-center"
                            style={{ backgroundColor: "#e7e0d6" }}
                            aria-hidden
                        />
                        <span
                            className="text-[10px] uppercase tracking-[0.2em] tabular-nums"
                            style={{ fontFamily: MONO, color: AMBER }}
                        >
                            {posts.length} {posts.length === 1 ? "post" : "posts"}
                        </span>
                    </div>

                    <h1
                        className="text-[34px] sm:text-[40px] leading-[1.08] font-medium tracking-[-0.02em] text-stone-900 text-balance"
                        style={{ fontFamily: SERIF }}
                    >
                        Home
                    </h1>
                    <p
                        className="mt-2 text-[13px] text-stone-500 max-w-[52ch]"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Quiet dispatches from the community — newest first.
                    </p>
                </header>

                {/* ── Feed ─────────────────────────────────── */}
                {isEmpty ? (
                    <div
                        className="border border-dashed rounded-2xl px-8 py-14 text-center"
                        style={{ borderColor: "#e7e0d6", backgroundColor: "#fdfbf8" }}
                    >
                        <p
                            className="text-[11px] uppercase tracking-[0.24em] mb-3"
                            style={{ fontFamily: MONO, color: AMBER }}
                        >
                            Nothing here yet
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {posts.map((post) => (
                            <Post key={post._id} post={post} />
                        ))}
                    </div>
                )}

                   {!isEmpty && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12 pt-6 border-t border-stone-100">
                        <button 
                            disabled={page === 1} 
                            onClick={() => setPage(p => p - 1)}
                            className="px-4 py-2 border border-stone-200 rounded-lg text-[13px] disabled:opacity-50 hover:bg-stone-50 transition-colors"
                        >
                            السابق
                        </button>
                        <span className="text-[12px]" style={{ fontFamily: MONO }}>
                            {page} / {totalPages}
                        </span>
                        <button 
                            disabled={page === totalPages} 
                            onClick={() => setPage(p => p + 1)}
                            className="px-4 py-2 border border-stone-200 rounded-lg text-[13px] disabled:opacity-50 hover:bg-stone-50 transition-colors"
                        >
                            التالي
                        </button>
                    </div>
                )}

                {/* ── Colophon ─────────────────────────────── */}
                {!isEmpty && (
                    <footer className="mt-12 pt-6 border-t border-stone-100 flex items-center justify-between">
                        <span
                            className="text-[10px] uppercase tracking-[0.22em] text-stone-400"
                            style={{ fontFamily: MONO }}
                        >
                            End of feed
                        </span>
                        <span
                            className="text-[10px] uppercase tracking-[0.22em]"
                            style={{ fontFamily: MONO, color: CLAY }}
                        >
                            ◦ ◦ ◦
                        </span>
                    </footer>
                )}
            </div>
        </div>
    );
}