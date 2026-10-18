import { useState } from "react";
import { useStore } from './store';
import { useEditeUser } from './useUser';

export default function EditUserPop() {
    const theUser = useStore((state) => state.theUser);
    const setediteUserPopFalse = useStore((state) => state.setediteUserPopFalse);
    
    // ✅ زدنا email هنا
    const [fullname, setFullname] = useState(theUser?.fullname || "");
    const [email, setEmail] = useState(theUser?.email || "");
    const [gender, setGender] = useState(theUser?.gender || "male");

    const { mutate: updateProfile, isPending } = useEditeUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!fullname.trim() || !email.trim()) return;

        // ✅ نبعثو email للباك إند
        updateProfile(
            { fullname, email, gender }, 
            {
                onSuccess: () => {
                    setediteUserPopFalse();
                },
                onError: (e) => {
                    console.log(e.message);
                }
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
                
                <button onClick={setediteUserPopFalse}
                    className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors text-lg"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold text-cyan-400 mb-6">تعديل الملف الشخصي</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* حقل الاسم */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">الاسم الكامل</label>
                        <input 
                            type="text" 
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder="أدخل اسمك..." 
                            required
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                        />
                    </div>

                    {/* ✅ حقل الإيميل */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">البريد الإلكتروني</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com" 
                            required
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                        />
                    </div>

                    {/* حقل الجنس */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">الجنس</label>
                        <select 
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                        >
                            <option value="male">ذكر</option>
                            <option value="female">أنثى</option>
                        </select>
                    </div>

                    {/* أزرار التحكم */}
                    <div className="flex items-center justify-end space-x-3 space-x-reverse pt-2">
                        <button onClick={setediteUserPopFalse}
                            type="button" 
                            className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            إلغاء
                        </button>
                        <button 
                            type="submit" 
                            disabled={isPending}
                            className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow"
                        >
                            {isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}