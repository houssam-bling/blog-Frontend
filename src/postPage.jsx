import { useParams, useNavigate } from "react-router";
import { useState, useMemo } from "react";
import LoadingPage from "./loadingPage";
import ErrorPage from "./errorPage";
import CommentItem from './comment';
import {useGetPostComments,useAddPostComments} from './useComment'
import {useLikePost,useDisLikesPost,useGetSinglePost} from './usePost'

export default function PostPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {data:data,isError,isLoading,error} = useGetSinglePost(id);
    const {data:commentsR} = useGetPostComments(id);
    const {mutate:LikePost} = useLikePost();
    const {mutate:Dislike} = useDisLikesPost();
    const {mutate:AddComment} = useAddPostComments();
    const post = data?.post;
    const comments = commentsR?.Comment || [];

    const [comment, setComment] = useState("");



    const publishDate = useMemo(() => {
        if (!post?.createdAt) return "";
        return new Date(post.createdAt).toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }, [post]);
    const initials = useMemo(() => {
        if (!post) return "";
        return  (post?.author?.fullname || "؟")
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }, [post]);
        


    const handleLike = () => {
        LikePost({id:id},{
            onError:(e)=>
            {
                console.log(e.message)
            },
        })
    };

    // Dislike
    const handleDislike = () => {
        Dislike({id:id},{
            onError:(e)=>
            {
                console.log(e.message)
            },
        })
    };


    if(isLoading) {return <LoadingPage/>}
    if(isError) {return <ErrorPage message={error.message}/>}

    const handleAddComment = () => {
        if (!comment.trim()) return;
        const  inputForm = {commentText:comment,postId:id}
        AddComment(inputForm,{onError:(e)=>
        {
            console.log(e.message)
        }})
        setComment("");
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
            <div className="max-w-3xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium mb-5 transition-colors group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    رجوع
                </button>

                {/* Main Card */}
                <article className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">

                    {/* Author Header */}
                    <div className="flex items-center gap-3 px-6 pt-6 pb-4">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-base font-bold shadow-md">
                            {initials}
                        </div>
                        <div className="flex-1">
                            <p className="text-white text-sm font-semibold">{post?.author?.fullname}</p>
                            <p className="text-slate-500 text-xs">{publishDate}</p>
                        </div>
                    </div>

                    {/* Title & Body */}
                    <div className="px-6 pb-6 space-y-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                            {post?.postTitle}
                        </h1>
                        <div className="h-px bg-linear-to-r from-cyan-500/40 via-slate-700/50 to-transparent"></div>
                        <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
                            {post?.postBody}
                        </p>
                    </div>

                    {/* Actions Bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-t border-slate-700/50 bg-slate-900/30">

                        <button
                            onClick={handleLike}
                            className={"flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95  bg-blue-500/20 text-blue-400 border border-blue-500/40"}
                        >
                            <span className="text-base">👍</span>
                            <span>إعجاب { post?.likes?.length}</span>
                        </button>

                        <button
                            onClick={handleDislike}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                                
                                     "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                                    
                            }`}
                        >
                            <span className="text-base">👎</span>
                            <span>عدم إعجاب { post?.dislikes?.length}</span>
                        </button>

                        <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/30">
                            <span className="text-base">💬</span>
                            <span>{comments?.length}</span>
                        </div>
                    </div>
                </article>

                {/* Comments Section */}
                <section className="mt-6 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
                        <h2 className="text-white font-bold text-base flex items-center gap-2">
                            💬 التعليقات
                            <span className="text-xs text-slate-400 bg-slate-700/60 px-2 py-0.5 rounded-full">
                                {comments?.length || 0}
                            </span>
                        </h2>
                    </div>

                    {/* Input */}
                    <div className="px-6 py-4 border-b border-slate-700/50">
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                أن
                            </div>
                            <div className="flex-1 space-y-3">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="شارك رأيك..."
                                    rows={2}
                                    className="w-full bg-slate-900/60 text-white text-sm px-4 py-3 rounded-xl border border-slate-700/60 focus:border-cyan-500/60 focus:outline-none placeholder:text-slate-500 resize-none transition-colors"
                                />
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleAddComment}
                                        disabled={!comment.trim()}
                                        className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md transition-all active:scale-95"
                                    >
                                        نشر التعليق
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="divide-y divide-slate-700/40">
                        {comments?.length === 0 ? (
                            <div className="px-6 py-10 text-center">
                                <p className="text-4xl mb-2">💭</p>
                                <p className="text-slate-400 text-sm">
                                    لا توجد تعليقات بعد
                                </p>
                                <p className="text-slate-500 text-xs mt-1">
                                    كن أول من يشارك رأيه!
                                </p>
                            </div>
                        ) : (
                            comments?.map((c) => (
                                <CommentItem key={c._id} comment={c} />
                            ))
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
}

