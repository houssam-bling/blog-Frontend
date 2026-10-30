import { MONO, DISPLAY, SANS, BODY, CLAY, SAGE, DUSTY } from '../../utils/tokens';
import { useGetAllPosts } from '../../hooks/usePost';
import { useGetAllComments } from '../../hooks/useComment';
import { useGetAdminStates } from '../../hooks/useState';

export default function AdminOverview() {
    // 1. جلب البيانات4
    const { data: adminStats, isLoading } = useGetAdminStates()

    const { data: postsData, isLoading: loadingPosts } = useGetAllPosts({ page: 1, limit: 5 });
    const { data: commentsData, isLoading: loadingComments } = useGetAllComments({ page: 1, limit: 5 });

    const usersCount = adminStats?.userCount || 0;
    const commentsCount = adminStats?.commentCount || 0;
    const postsCount = adminStats?.postCount || 0;
    
    const recentPosts = postsData?.Posts?.slice(0, 2) || [];
    const recentComments = commentsData?.Comments?.slice(0, 2) || [];

    // 2. إعداد الكروت
    const stats = [
        { label: "Total Users", value: isLoading ? "..." : usersCount.toLocaleString(), color: DUSTY },
        { label: "Total Posts", value: loadingPosts ? "..." : postsCount.toLocaleString(), color: SAGE },
        { label: "Total Comments", value: loadingComments ? "..." : commentsCount.toLocaleString(), color: CLAY },
    ];  

    return (
        <div className="space-y-10">
            
            {/* ── Header ────────────────────────────────── */}
            <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 mb-2" style={{ fontFamily: MONO }}>
                    System Overview / Live Data
                </p>
                <h1 className="text-[48px] leading-[0.9] font-medium tracking-[-0.03em] text-stone-900" style={{ fontFamily: DISPLAY }}>
                    Good morning,<br/>Admin.
                </h1>
            </div>

            {/* ── Stat Cards (3 Cards) ──────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, statIndex) => (
                    <div key={statIndex} className="bg-white border border-stone-300 p-6 flex flex-col justify-between min-h-35">
                        <div className="h-1 w-8 mb-6" style={{ backgroundColor: stat.color }}></div>
                        <div>
                            <h3 className="text-[42px] leading-none font-medium text-stone-900 mb-2 tracking-tighter" style={{ fontFamily: MONO }}>
                                {stat.value}
                            </h3>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500" style={{ fontFamily: MONO }}>
                                {stat.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Split Section: Posts & Comments ───────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Posts */}
                <div className="bg-white border border-stone-300 flex flex-col">
                    <div className="px-5 py-4 border-b border-stone-300 flex justify-between items-center bg-stone-50">
                        <h2 className="text-[16px] font-medium" style={{ fontFamily: DISPLAY }}>Recent Posts</h2>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400" style={{ fontFamily: MONO }}>Latest</span>
                    </div>
                    <div className="divide-y divide-stone-200">
                        {loadingPosts ? (
                            <div className="p-5 text-[11px] text-stone-400" style={{ fontFamily: MONO }}>Loading...</div>
                        ) : recentPosts.length === 0 ? (
                            <div className="p-5 text-[11px] text-stone-400" style={{ fontFamily: MONO }}>No posts found.</div>
                        ) : (
                            recentPosts.map((post, index) => (
                                <div key={post._id} className="p-5 flex items-start gap-4 hover:bg-[#fdfbf8] transition-colors cursor-default">
                                    <span className="text-[24px] leading-none font-medium text-stone-200 mt-1" style={{ fontFamily: MONO }}>
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-[16px] font-medium text-stone-900 truncate mb-1" style={{ fontFamily: DISPLAY }}>
                                            {post.postTitle}
                                        </h3>
                                        <p className="text-[11px] text-stone-500 uppercase tracking-wider" style={{ fontFamily: MONO }}>
                                            By {post.author?.fullname || "Unknown"}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Comments */}
                <div className="bg-white border border-stone-300 flex flex-col">
                    <div className="px-5 py-4 border-b border-stone-300 flex justify-between items-center bg-stone-50">
                        <h2 className="text-[16px] font-medium" style={{ fontFamily: DISPLAY }}>Recent Comments</h2>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400" style={{ fontFamily: MONO }}>Latest</span>
                    </div>
                    
                    <div className="divide-y divide-stone-200 flex-1">
                        {loadingComments ? (
                            <div className="p-5 text-[11px] text-stone-400" style={{ fontFamily: MONO }}>Loading...</div>
                        ) : recentComments.length === 0 ? (
                            <div className="p-5 text-[11px] text-stone-400" style={{ fontFamily: MONO }}>No comments found.</div>
                        ) : (
                            recentComments.map((comment, index) => (
                                <div key={comment._id} className="p-5 flex items-start gap-4 hover:bg-[#fdfbf8] transition-colors cursor-default">
                                    <span className="text-[24px] leading-none font-medium text-stone-200 mt-1" style={{ fontFamily: MONO }}>
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[12px] font-bold text-stone-900 mb-1" style={{ fontFamily: SANS }}>
                                            {comment.author?.fullname || "Unknown"}
                                        </p>
                                        <p className="text-[14px] text-stone-600 border-l-2 pl-3 py-1 line-clamp-2" style={{ fontFamily: BODY, borderColor: '#e7e0d6' }}>
                                            "{comment.commentText}"
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}