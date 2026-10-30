import { useGetPostComments, useAddPostComments } from '../hooks/useComment';
import { useState } from "react";
import { MONO, BODY, DUSTY, } from '../utils/tokens';
import { toast } from "react-hot-toast";


export default function CommentBox({ _id: postId })
{
    const [commentText, setCommentText] = useState("");
    const { mutate: addComment, isPending: isAddingComment } = useAddPostComments();
    const { data: commentsResponse } = useGetPostComments(postId);
    const comments = commentsResponse?.Comment || [];
    
    const handleAddComment = () => {
        if (!commentText.trim()) return;
        addComment({ commentText, postId }, {onSuccess:()=>{
                toast.success('تم اضافة تعليق بنجاح')
                setCommentText("");
            }, onError: (error) => toast.error(error.message)

        });
    };
    return(
                <section
                    className="px-6 py-4 space-y-3 border-t"
                    style={{ backgroundColor: "#f7f8fa", borderColor: "#e6e9ee" }}
                >
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={commentText}
                            onChange={(event) => setCommentText(event.target.value)}
                            onKeyDown={(event) => event.key === "Enter" && handleAddComment()}
                            placeholder="Write a reply…"
                            className="flex-1 bg-white border border-stone-200 rounded-lg px-3.5 py-2 text-[14px] text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 transition-colors"
                            style={{ fontFamily: BODY }}
                        />
                        <button disabled={isAddingComment}
                            onClick={handleAddComment}
                            className="px-4 py-2 rounded-lg text-white text-[12px] font-medium transition-opacity hover:opacity-90"
                            style={{ fontFamily: MONO, backgroundColor: DUSTY }}
                        >
                            {isAddingComment ? "Sending...": "Send"}
                        </button>
                    </div>

                    {comments?.length > 0 ? (
                        <ol className="max-h-56 overflow-y-auto -mx-1">
                            {comments.map((commentItem, index) => (
                                <li
                                    key={commentItem?._id}
                                    className="flex gap-3 px-1 py-2 text-[14px] text-stone-600"
                                    style={{ fontFamily: BODY }}
                                >
                                    <span
                                        className="text-[10px] pt-1 shrink-0 tabular-nums"
                                        style={{ fontFamily: MONO, color: DUSTY }}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className="leading-snug">{commentItem?.commentText}</span>
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
    );
}