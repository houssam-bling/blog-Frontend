import { Link } from "react-router";
import { useState } from "react";
import {useDisLikesPost,useLikePost} from './usePost'
import {useGetPostComments,useAddPostComments} from './useComment'

export default function Post({ post }) {
    const { _id, postTitle, postBody, likes = [], dislikes = [], author,createdAt } = post || {};

    // States مؤقتة للـ UI فقط
    const [showComment, setShowComment] = useState(false);
    const [comment, setComment] = useState("");

    const {mutate:LikePost} = useLikePost();
    const {mutate:Dislike} = useDisLikesPost();
    const {data:commentsR} = useGetPostComments(_id);

    const {mutate:AddComment} = useAddPostComments();


    const comments = commentsR?.Comment || [];



    const handleLike = () => {
        LikePost({id:_id},{
            onError:(e)=>
            {
                console.log(e.message)
            },
        })
    };

    // Dislike
    const handleDislike = () => {
        Dislike({id:_id},{
            onError:(e)=>
            {
                console.log(e.message)
            },
        })
    };

    // Comment - UI فقط
    const handleAddComment = () => {
        if (!comment.trim()) return;
        const  inputForm = {commentText:comment,postId:_id}
        AddComment(inputForm,{onError:(e)=>
        {
            console.log(e.message)
        }})
        setComment("");
    };
    return (
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-lg hover:shadow-xl hover:border-cyan-500/40 transition-all overflow-hidden">

            {/* Header - Author */}
            <div className="flex items-center gap-3 px-5 pt-5">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {(author?.fullname?.[0] || "؟").toUpperCase()}
                </div>
                <div className="flex-1">
                    <p className="text-white text-sm font-semibold">
                        {author?.fullname || "مستخدم مجهول"}
                    </p>
                    <p className="text-slate-500 text-xs">{createdAt}</p>
                </div>
                <button className="text-slate-400 hover:text-white transition-colors text-lg">
                    ⋯
                </button>
            </div>

            {/* Body */}
            <div className="px-5 pt-4 pb-3 space-y-2">
                <h2 className="text-lg font-bold text-white leading-snug">
                    {postTitle}
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                    {postBody}
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-slate-700/50">

                {/* Like */}
                <button
                    onClick={handleLike}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                      
                        
                            "text-slate-400 hover:bg-slate-700/60 hover:text-blue-400"
                    }`}
                >
                    <span className="text-base">👍</span>
                    <span>{likes?.length}</span>
                </button>

                {/* Dislike */}
                <button
                    onClick={handleDislike}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                        
                            
                             "text-slate-400 hover:bg-slate-700/60 hover:text-rose-400"
                    }`}
                >
                    <span className="text-base">👎</span>
                    <span>{dislikes?.length}</span>
                </button>

                {/* Comment Toggle */}
                <button
                    onClick={() => setShowComment(!showComment)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                        showComment
                            ? "bg-cyan-500/20 text-cyan-400"
                            : "text-slate-400 hover:bg-slate-700/60 hover:text-cyan-400"
                    }`}
                >
                    <span className="text-base">💬</span>
                    <span>{comments.length}</span>
                </button>
            </div>

            {/* Comment Section */}
            {showComment && (
                <div className="px-5 py-4 bg-slate-900/40 border-t border-slate-700/50 space-y-3">

                    {/* Input */}
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                            placeholder="اكتب تعليقاً..."
                            className="flex-1 bg-slate-800/80 text-white text-sm px-4 py-2.5 rounded-lg border border-slate-700/60 focus:border-cyan-500/60 focus:outline-none placeholder:text-slate-500 transition-colors"
                        />
                        <button
                            onClick={handleAddComment}
                            className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md transition-all active:scale-95"
                        >
                            إرسال
                        </button>
                    </div>

                    {/* Comments List */}
                    {comments?.length > 0 && (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {comments.map((c) => (
                                <div
                                    key={c?._id}
                                    className="bg-slate-800/60 rounded-lg px-3 py-2 text-sm text-slate-200 border border-slate-700/40"
                                >
                                    {c?.commentText}
                                </div>
                            ))}
                        </div>
                    )}

                    {comments?.length === 0 && (
                        <p className="text-center text-slate-500 text-xs py-2">
                            لا توجد تعليقات بعد — كن أول من يعلّق 💭
                        </p>
                    )}
                </div>
            )}

            {/* Footer - Read More */}
            <div className="px-5 py-3 border-t border-slate-700/50 flex justify-end">
                <Link
                    to={`/post/${_id}`}
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium inline-flex items-center gap-1 transition-colors no-underline"
                >
                    اقرأ المزيد <span className="text-lg leading-none">←</span>
                </Link>
            </div>
        </div>
    );
}