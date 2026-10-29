import { useState, useEffect } from 'react';
import { MONO, DISPLAY, SANS, ROSE } from '../../utils/tokens';
import { useGetAllPosts, useDeletePost } from '../../hooks/usePost';
import { useStore } from '../../store/store';
import { toast } from 'react-hot-toast';

export default function AdminPosts() {
    // 1. حالة الـ Pagination
    const [page, setPage] = useState(1);
    const limit = 10; // عدد المنشورات فـ كل صفحة

    // 2. جلب البيانات من الـ Hooks ديالك
    const { data, isLoading, isError, error } = useGetAllPosts({ page, limit });
    const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

    // 3. جلب دوال الـ Store باش نفتحو الـ Modal ديال الإضافة/التعديل
    const setAddPopTrue = useStore((s) => s.setAddPopTrue);
    const setPopMode = useStore((s) => s.setPopMode);
    const setThePost = useStore((s) => s.setThePost);

    const posts = data?.Posts || [];
    const totalPages = data?.TotalPages || 1;

    // ملي كتقلب للصفحة اللي من بعد، طلع الفوق أوتوماتيكياً
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    // 4. دالة الحذف
    const handleDelete = (id) => {
        if (!window.confirm("هل أنت متأكد من حذف هذا المنشور؟")) return;
        deletePost(id, {
            onSuccess: () => toast.success("تم حذف المنشور بنجاح"),
            onError: (e) => toast.error(e.message || "حدث خطأ أثناء الحذف")
        });
    };

    // 5. دالة فتح نافذة التعديل
    const handleEdit = (post) => {
        setPopMode("edit");
        setThePost(post);
        setAddPopTrue();
    };

    // 6. دالة فتح نافذة الإضافة
    const handleCreate = () => {
        setPopMode("add");
        setThePost(null);
        setAddPopTrue();
    };

    // 7. حالات التحميل والخطأ
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64 border border-stone-300 bg-white">
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 animate-pulse" style={{ fontFamily: MONO }}>
                    Loading Posts...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 border border-rose-300 bg-rose-50 text-rose-700">
                <p className="text-[13px]" style={{ fontFamily: SANS }}>
                    {error.message || "فشل في جلب المنشورات"}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-baseline mb-8">
                <h2 className="text-[32px] font-medium text-stone-900" style={{ fontFamily: DISPLAY }}>Manage Posts.</h2>
                <div className="flex items-center gap-4">
                    <span className="text-[11px] text-stone-500 uppercase tracking-widest" style={{ fontFamily: MONO }}>
                        Page {page} / {totalPages}
                    </span>
                    <button 
                        onClick={handleCreate}
                        className="bg-stone-900 text-white px-4 py-2 text-[11px] uppercase tracking-wider hover:bg-stone-800 transition-colors" 
                        style={{ fontFamily: MONO }}
                    >
                        Create New
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-stone-300">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-stone-50">
                            <th className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-stone-500 border-b border-stone-300 w-24" style={{ fontFamily: MONO }}>ID</th>
                            <th className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-stone-500 border-b border-stone-300" style={{ fontFamily: MONO }}>Title</th>
                            <th className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-stone-500 border-b border-stone-300 w-40" style={{ fontFamily: MONO }}>Author</th>
                            <th className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-stone-500 border-b border-stone-300 w-32" style={{ fontFamily: MONO }}>Date</th>
                            <th className="px-4 py-3 border-b border-stone-300 w-32"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-4 py-10 text-center text-[11px] uppercase tracking-widest text-stone-400" style={{ fontFamily: MONO }}>
                                    No posts found.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => {
                                // تنسيق التاريخ
                                const date = new Date(post.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'short', day: 'numeric'
                                });

                                return (
                                    <tr key={post._id} className="hover:bg-stone-50 transition-colors group">
                                        <td className="px-4 py-4 text-[11px] text-stone-400" style={{ fontFamily: MONO }}>
                                            #{post._id.slice(-6)}
                                        </td>
                                        <td className="px-4 py-4 text-[14px] font-medium text-stone-900 truncate max-w-xs" style={{ fontFamily: SANS }}>
                                            {post.postTitle}
                                        </td>
                                        <td className="px-4 py-4 text-[13px] text-stone-600" style={{ fontFamily: SANS }}>
                                            {post.author?.fullname || "Unknown"}
                                        </td>
                                        <td className="px-4 py-4 text-[12px] text-stone-500" style={{ fontFamily: MONO }}>
                                            {date}
                                        </td>
                                        <td className="px-4 py-4 text-right space-x-2">
                                            <button 
                                                onClick={() => handleEdit(post)}
                                                className="text-[10px] uppercase border border-stone-300 px-2 py-1 hover:bg-stone-800 hover:text-white transition-colors" 
                                                style={{ fontFamily: MONO }}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(post._id)}
                                                disabled={isDeleting}
                                                className="text-[10px] uppercase border border-stone-300 px-2 py-1 hover:bg-[--rose] hover:text-white hover:border-[--rose] transition-colors disabled:opacity-50" 
                                                style={{ fontFamily: MONO, '--rose': ROSE }}
                                            >
                                                Del
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* ── Pagination Controls ───────────────────── */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-stone-300">
                    <button 
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
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
                        onClick={() => setPage(p => p + 1)}
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