import { useState } from 'react';
import { MONO, SANS, BODY, CLAY, ROSE } from '../utils/tokens';
import { useGetProfile } from "../hooks/useUser.js";
import { toast } from "react-hot-toast";
import { useDeleteCommentById, useUpdateCommentById } from '../hooks/useComment.js';

export default function Comment({ comment }) {
    const [showMenu, setShowMenu] = useState(false);
    const [mode, setMode] = useState("read");
    const [Comment, setComment] = useState(comment?.commentText);
    const { data: theUser } = useGetProfile();
    const { mutate: deleteComment } = useDeleteCommentById();
    const { mutate: updateComment,isPending:editingPending } = useUpdateCommentById();

    const authorId = typeof comment?.author === 'object' ? comment?.author?._id : comment?.author;
    const currentUserId = theUser?.user?._id;
    const isMyComment = authorId && currentUserId && authorId === currentUserId;


    const handleDeleteComment = () => {
        if (!window.confirm("are you sure ?")) return;
        deleteComment({ id: comment?._id }, { onSuccess: () => toast.success('تم حذف التعليق بنجاح'), onError: (e) => toast.error(e.message) });
    };

    const handleUpdateComment = () => {
        setMode("edit");
    };

    const handleSave = () => {
        if(Comment === comment?.commentText)
        {
            setMode("read");
            return
        }
        updateComment({ id: comment._id, inputForm:{commentText: Comment} },{ onSuccess: () => toast.success('تم تعديل التعليق بنجاح'), onError: (e) => toast.error(e.message),onSettled:()=> setMode("read")});
    };

    const handleCancel = () => {
        setComment(comment?.commentText);
        setMode("read");
    };

    const handleReportComment = () => {
        setShowMenu(false);
        toast.success('تم إرسال البلاغ بنجاح');
    };

    const initials = (comment?.author?.fullname || "؟")
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const date = new Date(comment?.createdAt).toLocaleDateString("ar-EG", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <li className="py-5">
            <div className="flex items-start gap-3">
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0 border"
                    style={{ fontFamily: MONO, color: CLAY, borderColor: '#e8dcd0', backgroundColor: '#faf5ee' }}
                    aria-hidden
                >{initials}</div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between mb-1.5">
                        <div className="flex items-baseline gap-2">
                            <p className="text-[13px] font-medium text-stone-800 truncate" style={{ fontFamily: SANS }}>
                                {comment?.author?.fullname || "مجهول"}
                            </p>
                            <span className="text-[10px] text-stone-300 shrink-0" aria-hidden>·</span>
                            <p className="text-[10px] text-stone-400 shrink-0 tabular-nums" style={{ fontFamily: MONO }}>
                                {date}
                            </p>
                        </div>

                        {/* Menu ⋯ */}
                        <div className="relative shrink-0">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                aria-label="menu"
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors"
                            >
                                ⋯
                            </button>

                            {showMenu && (
                                <div
                                    className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-stone-200 rounded-lg shadow-sm overflow-hidden z-50"
                                    style={{ fontFamily: MONO }}
                                >
                                    {isMyComment ? (
                                        <div>
                                            <button
                                                onClick={() => { setShowMenu(false); handleDeleteComment(); }}
                                                className="w-full text-left px-3.5 py-2 text-[12px] hover:bg-[#fbf1ee] transition-colors"
                                                style={{ color: ROSE }}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => { setShowMenu(false); handleUpdateComment(); }}
                                                className="w-full text-left px-3.5 py-2 text-[12px] text-stone-700 hover:bg-stone-50 transition-colors"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleReportComment}
                                            className="w-full text-left px-3.5 py-2 text-[12px] hover:bg-[#fbf1ee] transition-colors"
                                            style={{ color: ROSE }}
                                        >
                                            Report
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {mode === "read" ? (
                        <p
                            className="text-[15px] leading-[1.7] text-stone-700 whitespace-pre-line wrap-anywhere"
                            style={{ fontFamily: BODY }}
                        >
                            {comment?.commentText}
                        </p>
                    ) : (
                        <div className="mt-2 space-y-2">
                            <input
                                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-[15px] text-stone-700 focus:outline-none focus:border-stone-800"
                                style={{ fontFamily: BODY }}
                                value={Comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleSave}
                                    className="px-3 py-1.5 bg-stone-900 text-white rounded-md text-[11px] uppercase tracking-wider hover:bg-stone-800 transition-colors"
                                    style={{ fontFamily: MONO }}
                                    disabled={editingPending}
                                >
                                    {editingPending ? "saving..." : "save"}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-3 py-1.5 bg-stone-200 text-stone-700 rounded-md text-[11px] uppercase tracking-wider hover:bg-stone-300 transition-colors"
                                    style={{ fontFamily: MONO }}
                                    disabled={editingPending}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
}