import { useState } from "react";
import {useStore} from './store'
import {useAddPost} from './usePost'

export default function AddPostModal() {
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const setAddPopFalse = useStore((set)=>set.setAddPopFalse);
    const {mutate:addPost,isPending:addingPost} = useAddPost();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!postTitle.trim() || !postBody.trim()) return;
        addPost({postTitle : postTitle ,postBody : postBody},
        {
            onSuccess:()=>
            {
                setAddPopFalse();
            },
            onError:(e)=>
            {
                console.log(e.message)
            },
        })
        setPostTitle("");
        setPostBody("");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
                
                <button onClick={setAddPopFalse}
                    className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors text-lg"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold text-cyan-400 mb-6">إضافة منشور جديد</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* حقل عنوان المنشور */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">عنوان المنشور (Title)</label>
                        <input 
                            type="text" 
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            placeholder="أدخل عنوان المنشور..." 
                            required
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                        />
                    </div>

                    {/* حقل محتوى المنشور */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">محتوى المنشور (Body)</label>
                        <textarea 
                            rows="4"
                            value={postBody}
                            onChange={(e) => setPostBody(e.target.value)}
                            placeholder="اكتب تفاصيل المنشور هنا..." 
                            required
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm resize-none"
                        ></textarea>
                    </div>

                    {/* أزرار التحكم */}
                    <div className="flex items-center justify-end space-x-3 space-x-reverse pt-2">
                        <button onClick={setAddPopFalse}
                            type="button" 
                            className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            إلغاء
                        </button>
                        <button 
                            type="submit" 
                            className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow"
                        >
                            نشر
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}