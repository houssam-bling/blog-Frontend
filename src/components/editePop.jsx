import { useEffect, useState } from "react";
import { useStore } from '../store/store.js';
import { useUpdateUser } from '../hooks/useUser';
import { MONO, DISPLAY, SANS, CLAY, AMBER, fieldClass } from '../utils/tokens.js';
import { toast } from "react-hot-toast";
import { useGetProfile } from "../hooks/useUser.js";
import LoadingPage from '../pages/loadingPage.jsx'
 

export default function EditUserPop() {

    const { data: profileData, isLoading: isProfileLoading } = useGetProfile();

    const userProfile = profileData?.user;

    const closeEditUserModal = useStore((state) => state.closeEditUserModal);

    const [fullname, setFullname] = useState( "");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("male");


    useEffect(() => {
        setFullname(userProfile?.fullname);
        setEmail(userProfile?.email);
        setGender(userProfile?.gender);
    }, [userProfile]);


    const { mutate: updateProfile, isPending } = useUpdateUser();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!fullname.trim() || !email.trim()) return;

        updateProfile(
            { fullname, email, gender },
            {
                onSuccess: () =>{
                    closeEditUserModal();
                    toast.success('تم تعديل المعلومات الشخصية')
                },
                onError: (error) => {
                    toast.error(error.message)
                },
            }
        );
    };

    if(isProfileLoading) return <LoadingPage/>

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/30 backdrop-blur-sm p-4">
            <div className="bg-white border border-stone-200/80 rounded-2xl w-full max-w-lg p-7 relative" role="dialog" aria-modal="true">

                <button
                    onClick={closeEditUserModal}
                    className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-md text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-colors text-sm"
                    aria-label="Close"
                >✕</button>

                {/* Kicker */}
                <div className="flex items-baseline gap-3 mb-5 pr-8">
                    <span className="text-[10px] uppercase tracking-[0.28em] font-bold" style={{ fontFamily: MONO, color: CLAY }}>Profile</span>
                    <span className="h-px flex-1 self-center" style={{ backgroundColor: '#e7e0d6' }} aria-hidden />
                    <span className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: MONO, color: AMBER }}>Edit</span>
                </div>

                <h2 className="text-[22px] leading-tight font-medium text-stone-900 mb-6" style={{ fontFamily: DISPLAY }}>
                    تعديل الملف الشخصي
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[11px] text-stone-500 mb-1.5 tracking-wide" style={{ fontFamily: SANS }}>الاسم الكامل</label>
                        <input
                            type="text"
                            value={fullname}
                            onChange={(event) => setFullname(event.target.value)}
                            placeholder="أدخل اسمك..."
                            required
                            className={fieldClass}
                            style={{ fontFamily: SANS }}
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] text-stone-500 mb-1.5 tracking-wide" style={{ fontFamily: SANS }}>البريد الإلكتروني</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="name@example.com"
                            required
                            className={fieldClass}
                            style={{ fontFamily: SANS }}
                            dir="ltr"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] text-stone-500 mb-1.5 tracking-wide" style={{ fontFamily: SANS }}>الجنس</label>
                        <select
                            value={gender}
                            onChange={(event) => setGender(event.target.value)}
                            className={fieldClass}
                            style={{ fontFamily: SANS }}
                        >
                            <option value="male">ذكر</option>
                            <option value="female">أنثى</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3">
                        <button
                            onClick={closeEditUserModal}
                            type="button"
                            className="px-4 py-2 rounded-lg text-[13px] text-stone-600 border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-colors"
                            style={{ fontFamily: SANS }}
                        >إلغاء</button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-5 py-2 rounded-lg text-[13px] font-medium bg-stone-800 text-white hover:bg-stone-900 disabled:opacity-60 transition-colors"
                            style={{ fontFamily: SANS }}
                        >
                            {isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}