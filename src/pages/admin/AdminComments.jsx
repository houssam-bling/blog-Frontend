import { useState } from 'react'; // 👈 زدنا useState و useEffect
import { MONO, DISPLAY, BODY, SANS, CLAY, ROSE } from '../../utils/tokens';
import { useGetAllComments, useDeleteCommentById } from '../../hooks/useComment';
import { toast } from 'react-hot-toast';

export default function AdminComments() {
    // 1. حالة الـ Pagination
    const [page, setPage] = useState(1);
    const limit = 5

    // 2. تمرير الصفحة الحالية للـ Hook
    const { data: commentsData, isLoading, isError, error } = useGetAllComments({ page, limit });
    const { mutate: deleteComment, isPending } = useDeleteCommentById();

    const comments = commentsData?.Comments || [];
    const totalPages = commentsData?.TotalPages;

    // 4. دالة الحذف
    const handleDelete = (commentId) => {
        if (!window.confirm("هل أنت متأكد من حذف هذا التعليق؟")) return;
        deleteComment({ id: commentId }, {
            onSuccess: () => toast.success("تم حذف التعليق"),
            onError: (error) => toast.error(error.message)
        });
    };

    // 5. حالات التحميل والخطأ
    if (isLoading) return <div className="p-6 text-[11px] text-stone-500 uppercase" style={{ fontFamily: MONO }}>Loading comments...</div>;
    if (isError) return <div className="p-6 text-[11px] text-rose-500" style={{ fontFamily: MONO }}>{error.message}</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="mb-8 flex justify-between items-baseline">
                <h2 className="text-[32px] font-medium text-stone-900" style={{ fontFamily: DISPLAY }}>Moderate Comments.</h2>
                <span className="text-[11px] text-stone-500 uppercase tracking-widest" style={{ fontFamily: MONO }}>
                    Page {page} / {totalPages}
                </span>
            </div>

            {/* List */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="text-[11px] uppercase tracking-widest text-stone-400" style={{ fontFamily: MONO }}>No comments found.</p>
                ) : (
                    comments.map((commentItem) => (
                        <div key={commentItem._id} className="bg-white border border-stone-300 p-5 flex gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[11px] text-stone-400" style={{ fontFamily: MONO }}>
                                        #{commentItem._id.slice(-4)}
                                    </span>
                                    <span className="text-[13px] font-bold text-stone-900" style={{ fontFamily: SANS }}>
                                        {commentItem.author?.fullname || "Unknown"}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-widest text-stone-400" style={{ fontFamily: MONO }}>On Post</span>
                                    <span className="text-[12px] font-medium truncate max-w-[200px]" style={{ fontFamily: DISPLAY, color: CLAY }}>
                                        {commentItem.postId?.postTitle || "Unknown Post"}
                                    </span>
                                </div>
                                <p className="text-[15px] text-stone-700 leading-relaxed border-l-2 border-stone-200 pl-4 py-1 mt-3" style={{ fontFamily: BODY }}>
                                    "{commentItem.commentText}"
                                </p>
                            </div>
                            <div className="flex flex-col justify-between items-end shrink-0 w-24">
                                <span className="text-[10px] text-stone-400" style={{ fontFamily: MONO }}>
                                    {new Date(commentItem.createdAt).toLocaleDateString()}
                                </span>
                                <button 
                                    onClick={() => handleDelete(commentItem._id)}
                                    disabled={isPending}
                                    className="text-[10px] uppercase tracking-widest border border-stone-300 px-2 py-1 hover:bg-[--rose] hover:text-white hover:border-[--rose] transition-colors w-full disabled:opacity-50" 
                                    style={{ fontFamily: MONO, '--rose': ROSE }}
                                >
                                    {isPending ? '...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* ── Pagination Controls ───────────────────── */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-stone-300">
                    <button 
                        disabled={page === 1}
                        onClick={() => setPage(currentPage => currentPage - 1)}
                        className="text-[11px] uppercase tracking-widest border border-stone-300 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone-800"
                        style={{ fontFamily: MONO }}
                    >
                        Previous
                    </button>
                    <span className="text-[11px] text-stone-500" style={{ fontFamily: MONO }}>
                        {page} / {totalPages}
                    </span>
                    <button 
                        disabled={page === totalPages}
                        onClick={() => setPage(currentPage => currentPage + 1)}
                        className="text-[11px] uppercase tracking-widest border border-stone-300 px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone-800"
                        style={{ fontFamily: MONO }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}