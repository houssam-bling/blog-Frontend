import { useNavigate } from "react-router";
import { useGetMyPosts } from './usePost'
import { useStore } from './store';
import { MONO, DISPLAY, SANS, CLAY, AMBER } from './tokens';

export default function ProfilePage() {
    const navigate = useNavigate();
    const posts = useGetMyPosts();

    const currentUser = useStore((state) => state.theUser) || {};
    const setediteUserPopTrue = useStore((state) => state.setediteUserPopTrue);

    const user = {
        fullname: currentUser?.fullname || "اسم المستخدم",
        email: currentUser?.email || "user@example.com",
        gender: currentUser?.gender || "male",
        role: currentUser?.role || "user",
        createdAt: currentUser?.createdAt || new Date().toISOString(),
    };

    const initials = user.fullname.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
    const joinDate = new Date(user.createdAt).toLocaleDateString("ar-EG", {
        year: "numeric", month: "long", day: "numeric",
    });

    const isAdmin = user.role === "admin";

    return (
        <div className="min-h-screen bg-[#fdfbf8] text-stone-800">
            <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16">

                {/* Kicker */}
                <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-[10px] uppercase tracking-[0.28em] font-bold" style={{ fontFamily: MONO, color: CLAY }}>Profile</span>
                    <span className="h-px flex-1 self-center" style={{ backgroundColor: '#e7e0d6' }} aria-hidden />
                    <span className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: MONO, color: AMBER }}>
                        {isAdmin ? "Admin" : "Member"}
                    </span>
                </div>

                {/* Profile card */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-7 sm:p-9">
                    <div className="flex items-start gap-5 mb-7">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center text-[18px] font-medium shrink-0 border"
                            style={{ fontFamily: MONO, color: CLAY, borderColor: '#e8dcd0', backgroundColor: '#faf5ee' }}
                            aria-hidden
                        >{initials}</div>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-[24px] leading-tight font-medium text-stone-900 mb-1 truncate" style={{ fontFamily: DISPLAY }}>
                                {user.fullname}
                            </h1>
                            <p className="text-[12px] text-stone-500 truncate" style={{ fontFamily: MONO }} dir="ltr">
                                {user.email}
                            </p>
                        </div>
                        <span
                            className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] uppercase tracking-[0.2em] border shrink-0"
                            style={{
                                fontFamily: MONO,
                                color: isAdmin ? AMBER : CLAY,
                                borderColor: isAdmin ? '#eedfc2' : '#e8dcd0',
                                backgroundColor: isAdmin ? '#fdf7ec' : '#faf5ee',
                            }}
                        >{isAdmin ? 'Admin' : 'User'}</span>
                    </div>

                    <div className="h-px mb-7" style={{ backgroundColor: '#e7e0d6' }} aria-hidden />

                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                        <InfoRow label="Email"  value={user.email} dir="ltr" />
                        <InfoRow label="Gender" value={user.gender === "male" ? "ذكر" : "أنثى"} />
                        <InfoRow label="Role"   value={isAdmin ? "مشرف" : "مستخدم"} />
                        <InfoRow label="Joined" value={joinDate} />
                    </dl>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 mt-6">
                    <button
                        onClick={setediteUserPopTrue}
                        className="flex-1 bg-stone-800 hover:bg-stone-900 text-white px-5 py-2.5 rounded-lg text-[13px] font-medium transition-colors"
                        style={{ fontFamily: SANS }}
                    >تعديل الملف الشخصي</button>
                    <button
                        onClick={() => navigate("/")}
                        className="flex-1 bg-white border border-stone-200 hover:border-stone-400 hover:bg-stone-50 text-stone-700 px-5 py-2.5 rounded-lg text-[13px] font-medium transition-colors"
                        style={{ fontFamily: SANS }}
                    >العودة للرئيسية</button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                    <StatCard label="Posts" value={posts?.data?.length || 0} />
                </div>
            </div>
        </div>
    );
}

function InfoRow({ label, value, dir }) {
    return (
        <div className="flex items-baseline justify-between gap-3 border-b border-stone-100 pb-3">
            <dt className="text-[10px] uppercase tracking-[0.22em] text-stone-400 shrink-0" style={{ fontFamily: MONO }}>{label}</dt>
            <dd className="text-[13px] text-stone-800 text-right truncate" style={{ fontFamily: SANS }} dir={dir}>{value}</dd>
        </div>
    );
}

function StatCard({ label, value }) {
    return (
        <div className="border border-stone-200/80 rounded-xl bg-white px-4 py-3 flex items-baseline gap-3">
            <span className="text-[26px] leading-none font-medium text-stone-900 tabular-nums" style={{ fontFamily: MONO }}>{value}</span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-stone-400" style={{ fontFamily: MONO }}>{label}</span>
        </div>
    );
}