import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import LoadingPage from "./loadingPage.jsx.jsx";
import ErrorPage from "./errorPage.jsx.jsx";
import CommentItem from '../components/comment.jsx';
import { useGetPostComments, useAddPostComments } from '../useComment'
import { useLikePost, useDisLikesPost, useGetSinglePost } from '../usePost'
import { MONO, DISPLAY, BODY, SANS, CLAY, SAGE, ROSE, DUSTY, AMBER } from '../utils/tokens.js';
import { useGetProfile } from "../useUser.js";
import {toast} from 'react-hot-toast'


export default function PostPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isError, isLoading, error } = useGetSinglePost(id);
    const { data: commentsR } = useGetPostComments(id);
    const { mutate: LikePost,isPending:addingLike } = useLikePost();
    const { mutate: Dislike,isPending:addingDislike } = useDisLikesPost();
    const {data:theUser} = useGetProfile();
    const { mutate: AddComment } = useAddPostComments();

    const currentUserId = theUser?.user?._id;

    const post = data?.post;
    const comments = commentsR?.Comment || [];

    const [comment, setComment] = useState("");

    const publishDate = new Date(post?.createdAt).toLocaleDateString("ar-EG", {
            year: "numeric", month: "long", day: "numeric",
            hour: "2-digit", minute: "2-digit",
        });

    const initials = (post?.author?.fullname || "؟").split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

    const handleLike = () => LikePost({ id,userId:currentUserId },  {onSuccess:()=>{
            toast.success('تم اضافة اعجاب بنجاح')
        }, onError: (e) =>toast.error(e.message)});
    const handleDislike = () => Dislike({ id ,userId:currentUserId},  {onSuccess:()=>{
            toast.success('تم اضافة عدم اعجاب بنجاح')
        }, onError: (e) =>toast.error(e.message)});
    const handleAddComment = () => {
        if (!comment.trim()) return;
        AddComment({ commentText: comment, postId: id }, { onError: (e) => toast.error(e.message),onSuccess:()=>setComment("") });
        
    };

    if (isLoading) return <LoadingPage />;
    if (isError) return <ErrorPage message={error.message} />;

    return (
        <div className="min-h-screen bg-[#fdfbf8] text-stone-800">
            <div className="max-w-2xl mx-auto px-6 py-10 sm:py-14">

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="group inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-stone-500 hover:text-stone-900 mb-8 transition-colors"
                    style={{ fontFamily: MONO }}
                >
                    <span className="inline-block transition-transform group-hover:-translate-x-0.5">←</span>
                    Back
                </button>

                {/* Article */}
                <article>
                    <div className="flex items-baseline gap-3 mb-5">
                        <span className="text-[10px] uppercase tracking-[0.28em] font-bold" style={{ fontFamily: MONO, color: CLAY }}>Article</span>
                        <span className="h-px flex-1 self-center" style={{ backgroundColor: '#e7e0d6' }} aria-hidden />
                        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: MONO, color: AMBER }}>
                            {comments.length} {comments.length === 1 ? 'reply' : 'replies'}
                        </span>
                    </div>

                    <h1
                        className="text-[30px] sm:text-[36px] leading-[1.15] font-medium tracking-[-0.01em] text-stone-900 mb-6 text-balance"
                        style={{ fontFamily: DISPLAY }}
                    >{post?.postTitle}</h1>

                    {/* Byline */}
                    <div className="flex items-center gap-3 pb-6 mb-8 border-b border-stone-200/80">
                        <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-medium border shrink-0"
                            style={{ fontFamily: MONO, color: CLAY, borderColor: '#e8dcd0', backgroundColor: '#faf5ee' }}
                            aria-hidden
                        >{initials}</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-medium text-stone-800 truncate" style={{ fontFamily: SANS }}>
                                {post?.author?.fullname || "Anonymous"}
                            </p>
                            <p className="text-[10px] text-stone-400" style={{ fontFamily: MONO }}>{publishDate}</p>
                        </div>
                    </div>

                    {/* Body */}
                    <div
                        className="text-[16px] leading-[1.8] text-stone-700 whitespace-pre-line max-w-[68ch]"
                        style={{ fontFamily: BODY }}
                    >{post?.postBody}</div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 mt-10 pt-6 border-t border-stone-200/80">
                        <button
                            disabled={addingLike}
                            onClick={handleLike}
                            className="group flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] text-stone-500 hover:bg-[#f0f4ee] transition-colors"
                        >
                            <span className="text-[13px] transition-colors group-hover:text-(--sage)" style={{ '--sage': SAGE }}>↑</span>
                            <span className="tabular-nums transition-colors group-hover:text-(--sage)" style={{ fontFamily: MONO, '--sage': SAGE }}>
                                {post?.likes?.length ?? 0}
                            </span>
                        </button>
                        <button
                            disabled={addingDislike}
                            onClick={handleDislike}
                            className="group flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] text-stone-500 hover:bg-[#f8eff0] transition-colors"
                        >
                            <span className="text-[13px] transition-colors group-hover:text-(--rose)" style={{ '--rose': ROSE }}>↓</span>
                            <span className="tabular-nums transition-colors group-hover:text-(--rose)" style={{ fontFamily: MONO, '--rose': ROSE }}>
                                {post?.dislikes?.length ?? 0}
                            </span>
                        </button>
                        <div className="ml-auto flex items-center gap-1.5 text-[12px]" style={{ color: DUSTY }}>
                            <span className="text-[13px]">❞</span>
                            <span className="tabular-nums" style={{ fontFamily: MONO }}>{comments.length}</span>
                        </div>
                    </div>
                </article>

                {/* Comments */}
                <section className="mt-12 pt-8 border-t border-stone-200/80">
                    <div className="flex items-baseline gap-3 mb-6">
                        <span className="text-[10px] uppercase tracking-[0.28em] font-bold" style={{ fontFamily: MONO, color: CLAY }}>Replies</span>
                        <span className="h-px flex-1 self-center" style={{ backgroundColor: '#e7e0d6' }} aria-hidden />
                        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: MONO, color: AMBER }}>
                            {comments.length === 0 ? 'None yet' : comments.length}
                        </span>
                    </div>

                    {/* Composer */}
                    <div className="flex items-stretch border border-stone-200 rounded-xl overflow-hidden bg-white mb-6 focus-within:border-stone-800 transition-colors">
                        <input
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                            placeholder="Write a reply…"
                            className="flex-1 px-4 py-3 text-[14px] text-stone-800 placeholder:text-stone-400 bg-transparent focus:outline-none min-w-0"
                            style={{ fontFamily: BODY }}
                        />
                        <button
                            onClick={handleAddComment}
                            disabled={!comment.trim()}
                            className="px-5 border-l border-stone-200 text-[11px] uppercase tracking-[0.22em] font-bold hover:bg-stone-800 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-stone-800 transition-colors"
                            style={{ fontFamily: MONO }}
                        >Send</button>
                    </div>

                    {/* List */}
                    {comments.length === 0 ? (
                        <p className="text-center text-[10px] uppercase tracking-[0.22em] text-stone-400 py-8" style={{ fontFamily: MONO }}>
                            No replies yet — be the first
                        </p>
                    ) : (
                        <ol className="divide-y divide-stone-100">
                            {comments.map((c) => (
                                <CommentItem key={c._id} comment={c} />
                            ))}
                        </ol>
                    )}
                </section>
            </div>
        </div>
    );
}