import { useNavigate } from "react-router";
import {useGetMyPosts} from './usePost'
import { useStore } from './store';

export default function ProfilePage() {
    const navigate = useNavigate();
    const posts = useGetMyPosts();

    const currentUser = JSON.parse(localStorage.getItem("CurrentUser") || {});
    
    const setediteUserPopTrue = useStore((state) => state.setediteUserPopTrue);

    const user = {
        fullname: currentUser?.fullname || "اسم المستخدم",
        email: currentUser?.email || "user@example.com",
        gender: currentUser?.gender || "male",
        role: currentUser?.role || "user",
        createdAt: currentUser?.createdAt || new Date().toISOString(),
    };
    console.log(posts)
    const initials = user.fullname
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const joinDate = new Date(user.createdAt).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-10 px-4">
            <div className="max-w-3xl mx-auto">

                {/* Card الرئيسية */}
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
                    {/* Avatar + Info */}
                    <div className="px- py-20 sm:px-8 pb-8">

                        {/* Avatar */}
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-slate-800">
                                    {initials}
                                </div>
                                <div className="sm:pb-2">
                                    <h1 className="text-2xl font-bold text-white">
                                        {user.fullname}
                                    </h1>
                                    <p className="text-slate-400 text-sm mt-1">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            {/* Role Badge */}
                            <div className="mt-4 sm:mt-0 sm:pb-2">
                                <span
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                                        user.role === "admin"
                                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                            : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                                    }`}
                                >
                                    {user.role === "admin" ? "👑 admin" : "👤 user"}
                                </span>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

                            <InfoCard
                                icon="📧"
                                label="البريد الإلكتروني"
                                value={user.email}
                            />

                            <InfoCard
                                icon={user.gender === "male" ? "♂️" : "♀️"}
                                label="الجنس"
                                value={user.gender === "male" ? "ذكر" : "أنثى"}
                            />

                            <InfoCard
                                icon="🎭"
                                label="الدور"
                                value={user.role === "admin" ? "مشرف" : "مستخدم"}
                            />

                            <InfoCard
                                icon="📅"
                                label="تاريخ الانضمام"
                                value={joinDate}
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-slate-700/50">
                            <button onClick={setediteUserPopTrue}
                                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
                            >
                                ✏️ تعديل الملف الشخصي
                            </button>
                            <button
                                onClick={() => navigate("/")}
                                className="flex-1 bg-slate-700/60 hover:bg-slate-700 text-slate-200 px-5 py-3 rounded-xl text-sm font-semibold border border-slate-600/50 transition-all active:scale-95"
                            >
                                🏠 العودة للرئيسية
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <StatCard label="المنشورات" value={posts?.length} icon="📝" />
                </div>

            </div>
        </div>
    );
}

/* ===== مكوّنات صغيرة ===== */

function InfoCard({ icon, label, value }) {
    return (
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/40 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
                <span className="text-base">{icon}</span>
                {label}
            </div>
            <p className="text-white text-sm font-semibold truncate">{value}</p>
        </div>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 flex items-center gap-4 hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xl">
                {icon}
            </div>
            <div>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
            </div>
        </div>
    );
}