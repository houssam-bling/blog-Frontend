import { Link } from "react-router";
import { useState } from "react";
import { useDeletePost, useDisLikesPost, useLikePost } from './usePost';
import { useGetPostComments, useAddPostComments } from './useComment';
import { useStore } from './store.js';
import { toast } from "react-hot-toast";

const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const SERIF = "'Newsreader', 'Instrument Serif', Georgia, serif";
const BODY = "'Georgia', 'Times New Roman', serif";

// Semantic palette — one muted earth tone per action
const CLAY   = "#b5714d"; // accent / byline / read-more
const SAGE   = "#6b8a6b"; // like
const ROSE   = "#b5727a"; // dislike
const DUSTY  = "#7a8ba3"; 
const AMBER  = "#c99a4a"; 

export default function Post({ post }) {
    const { _id, postTitle, postBody, likes = [], dislikes = [], author, createdAt } = post || {};

    const [showComment, setShowComment] = useState(false);
    const [comment, setComment] = useState("");
    const [showMenu, setShowMenu] = useState(false);

    const theUser = useStore((state) => state.theUser) || {};
    const authorId = typeof author === 'object' ? author?._id : author;
    const currentUserId = theUser?._id;
    const isMyPost = authorId && currentUserId && authorId === currentUserId;

    const { mutate: LikePost } = useLikePost();
    const { mutate: Dislike } = useDisLikesPost();
    const { mutate: deletePost } = useDeletePost();
    const { data: commentsR } = useGetPostComments(_id);

    const setAddPopTrue = useStore((s) => s.setAddPopTrue);
    const setPopMode = useStore((s) => s.setPopMode);
    const setThePost = useStore((s) => s.setThePost);

    const { mutate: AddComment } = useAddPostComments();
    const comments = commentsR?.Comment || [];

    const handleLike = () => LikePost({ id: _id }, {onSuccess:()=>{
            toast.success('تم اضافة اعجاب بنجاح')
        }, onError: (e) =>toast.error(e.message)})
    const handleDislike = () => Dislike({ id: _id }, {onSuccess:()=>{
            toast.success('تم اضافة عدم اعجاب بنجاح')
        }, onError: (e) =>toast.error(e.message)});

    const handleAddComment = () => {
        if (!comment.trim()) return;
        AddComment({ commentText: comment, postId: _id }, {onSuccess:()=>{
            toast.success('تم اضافة تعليق بنجاح')
        }, onError: (e) =>toast.error(e.message)

 });
        setComment("");
    };

    const handleDeletPost = () => {
        if (!window.confirm("are you sure ?")) return;
        deletePost(_id, {onSuccess:()=>{
            toast.success('تم حذف المنشور بنجاح')
        }, onError: (e) =>toast.error(e.message)
    } )
    };

    const handleEditPost = () => {
        setPopMode("edit");
        setThePost(post);
        setAddPopTrue();
    };

    return (
        <article className="border border-stone-200/80 rounded-2xl bg-white text-stone-800 overflow-hidden">

            {/* ── Header ─────────────────────────────── */}
            <header className="flex items-center gap-3 px-6 pt-5 pb-4">
                <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-medium shrink-0 border"
                    style={{ backgroundColor: "#f4ede4", borderColor: "#e8dcd0", color: CLAY }}
                >
                    {(author?.fullname?.[0] || "?").toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-stone-800 truncate">
                        {author?.fullname || "Anonymous"}
                    </p>
                    <p className="text-[11px]" style={{ fontFamily: MONO, color: AMBER }}>
                        {createdAt}
                    </p>
                </div>

                {/* Menu */}
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
                            {isMyPost ? (
                                <>
                                    <button
                                        onClick={() => { setShowMenu(false); handleEditPost(); }}
                                        className="w-full text-left px-3.5 py-2 text-[12px] text-stone-700 hover:bg-stone-50 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => { setShowMenu(false); handleDeletPost(); }}
                                        className="w-full text-left px-3.5 py-2 text-[12px] hover:bg-[#fbf1ee] transition-colors"
                                        style={{ color: ROSE }}
                                    >
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setShowMenu(false)}
                                    className="w-full text-left px-3.5 py-2 text-[12px] hover:bg-[#fbf1ee] transition-colors"
                                    style={{ color: ROSE }}
                                >
                                    Report
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </header>

            {/* ── Body ──────────────────────────────── */}
            <div className="px-6 pb-4">
                <h2
                    className="text-[23px] leading-[1.28] font-medium tracking-[-0.01em] text-stone-800 mb-2 text-balance"
                    style={{ fontFamily: SERIF }}
                >
                    {postTitle}
                </h2>
                <p
                    className="text-[15px] leading-[1.7] text-stone-600 line-clamp-3 max-w-[68ch]"
                    style={{ fontFamily: BODY }}
                >
                    {postBody}
                </p>
            </div>

            {/* ── Actions ───────────────────────────── */}
            <div className="flex items-center gap-1 px-3 pb-2">
                <button
                    onClick={handleLike}
                    className="group flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] text-stone-500 transition-colors hover:bg-[#f0f4ee]"
                >
                    <span className="text-[12px] transition-colors group-hover:text-(--sage)" style={{ '--sage': SAGE }}>↑</span>
                    <span className="tabular-nums transition-colors group-hover:text-(--sage)" style={{ fontFamily: MONO, '--sage': SAGE }}>
                        {likes?.length}
                    </span>
                </button>

                <button
                    onClick={handleDislike}
                    className="group flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] text-stone-500 transition-colors hover:bg-[#f8eff0]"
                >
                    <span className="text-[12px] transition-colors group-hover:text-(--rose)" style={{ '--rose': ROSE }}>↓</span>
                    <span className="tabular-nums transition-colors group-hover:text-(--rose)" style={{ fontFamily: MONO, '--rose': ROSE }}>
                        {dislikes?.length}
                    </span>
                </button>

                <button
                    onClick={() => setShowComment(!showComment)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] transition-colors ${
                        showComment
                            ? "bg-[#eef1f6]"
                            : "text-stone-500 hover:bg-[#eef1f6]"
                    }`}
                    style={showComment ? { color: DUSTY } : undefined}
                >
                    <span className="text-[12px]" style={showComment ? { color: DUSTY } : undefined}>❞</span>
                    <span className="tabular-nums" style={{ fontFamily: MONO, color: showComment ? DUSTY : undefined }}>
                        {comments.length}
                    </span>
                </button>
            </div>

            {/* ── Comments ──────────────────────────── */}
            {showComment && (
                <section
                    className="px-6 py-4 space-y-3 border-t"
                    style={{ backgroundColor: "#f7f8fa", borderColor: "#e6e9ee" }}
                >
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                            placeholder="Write a reply…"
                            className="flex-1 bg-white border border-stone-200 rounded-lg px-3.5 py-2 text-[14px] text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 transition-colors"
                            style={{ fontFamily: BODY }}
                        />
                        <button
                            onClick={handleAddComment}
                            className="px-4 py-2 rounded-lg text-white text-[12px] font-medium transition-opacity hover:opacity-90"
                            style={{ fontFamily: MONO, backgroundColor: DUSTY }}
                        >
                            Send
                        </button>
                    </div>

                    {comments?.length > 0 ? (
                        <ol className="max-h-56 overflow-y-auto -mx-1">
                            {comments.map((c, i) => (
                                <li
                                    key={c?._id}
                                    className="flex gap-3 px-1 py-2 text-[14px] text-stone-600"
                                    style={{ fontFamily: BODY }}
                                >
                                    <span
                                        className="text-[10px] pt-1 shrink-0 tabular-nums"
                                        style={{ fontFamily: MONO, color: DUSTY }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="leading-snug">{c?.commentText}</span>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p
                            className="text-center text-[11px] py-1"
                            style={{ fontFamily: MONO, color: DUSTY, opacity: 0.65 }}
                        >
                            No replies yet — be the first
                        </p>
                    )}
                </section>
            )}

            {/* ── Read more ─────────────────────────── */}
            <div className="flex justify-end px-6 py-3 border-t border-stone-100">
                <Link
                    to={`/post/${_id}`}
                    className="group inline-flex items-center gap-1.5 text-[13px] font-medium no-underline transition-colors hover:text-(--clay)"
                    style={{ color: "#78716c", '--clay': CLAY }}
                >
                    Read more
                    <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
            </div>
        </article>
    );
}