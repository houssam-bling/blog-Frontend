import { useState } from "react";
import { useStore } from './store'
import { useAddPost, useEditPost } from './usePost'
import { MONO, DISPLAY, SANS, CLAY, AMBER, fieldClass } from './tokens';
import { toast } from "react-hot-toast";


export default function AddPostModal() {
    const popMode = useStore((set) => set.PopMode);
    const PostInfo = useStore((set) => set.thePost);
    const [postTitle, setPostTitle] = useState(popMode === "add" ? "" : PostInfo?.postTitle || '');
    const [postBody, setPostBody] = useState(popMode === "add" ? "" : PostInfo?.postBody || '');
    const setAddPopFalse = useStore((set) => set.setAddPopFalse);
    const { mutate: addPost, isPending: addingPost } = useAddPost();
    const { mutate: editePost, isPending: editingPost } = useEditPost();

    const isAdd = popMode === "add";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!postTitle.trim() || !postBody.trim()) return;

        if (isAdd) {
            addPost({ postTitle, postBody }, { 
                onSuccess : ()=>{
                    setAddPopFalse();
                    setPostBody("");
                    setPostTitle("");
                    toast.success('تم اضافة المنشور بنجاح')
                }
                , onError : (e)=>{
                    toast.error(e.message)
                } });
        } else {
            editePost({ id: PostInfo?._id, inputForm: { postTitle, postBody } }, {   onSuccess : ()=>{
                    setAddPopFalse();
                    setPostBody("");
                    setPostTitle("");
                    toast.success('تم تعديل المنشور بنجاح')
                }
                , onError : (e)=>{
                    toast.error(e.message)
                } 
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/30 backdrop-blur-sm p-4">
            <div className="bg-white border border-stone-200/80 rounded-2xl w-full max-w-lg p-7 relative" role="dialog" aria-modal="true">

                <button
                    onClick={setAddPopFalse}
                    className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-md text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-colors text-sm"
                    aria-label="Close"
                >✕</button>

                {/* Kicker */}
                <div className="flex items-baseline gap-3 mb-5 pr-8">
                    <span className="text-[10px] uppercase tracking-[0.28em] font-bold" style={{ fontFamily: MONO, color: CLAY }}>
                        {isAdd ? 'Compose' : 'Edit'}
                    </span>
                    <span className="h-px flex-1 self-center" style={{ backgroundColor: '#e7e0d6' }} aria-hidden />
                    <span className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: MONO, color: AMBER }}>
                        {isAdd ? 'New' : 'Draft'}
                    </span>
                </div>

                <h2 className="text-[22px] leading-tight font-medium text-stone-900 mb-6" style={{ fontFamily: DISPLAY }}>
                    {isAdd ? "منشور جديد" : "تعديل المنشور"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[11px] text-stone-500 mb-1.5 tracking-wide" style={{ fontFamily: SANS }}>عنوان المنشور</label>
                        <input
                            type="text"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            placeholder="أدخل عنواناً..."
                            required
                            className={fieldClass}
                            style={{ fontFamily: SANS }}
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] text-stone-500 mb-1.5 tracking-wide" style={{ fontFamily: SANS }}>المحتوى</label>
                        <textarea
                            rows={5}
                            value={postBody}
                            onChange={(e) => setPostBody(e.target.value)}
                            placeholder="اكتب تفاصيل المنشور هنا..."
                            required
                            className={`${fieldClass} resize-none`}
                            style={{ fontFamily: SANS }}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3">
                        <button
                            onClick={setAddPopFalse}
                            type="button"
                            className="px-4 py-2 rounded-lg text-[13px] text-stone-600 border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-colors"
                            style={{ fontFamily: SANS }}
                        >إلغاء</button>
                        <button
                            disabled={addingPost || editingPost}
                            type="submit"
                            className="px-5 py-2 rounded-lg text-[13px] font-medium bg-stone-800 text-white hover:bg-stone-900 disabled:opacity-60 transition-colors"
                            style={{ fontFamily: SANS }}
                        >
                            {isAdd
                                ? (addingPost ? "يتم النشر..." : "نشر")
                                : (editingPost ? "يتم التعديل..." : "تعديل")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}