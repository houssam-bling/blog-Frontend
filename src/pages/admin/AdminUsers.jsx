import { MONO, DISPLAY, SANS, AMBER, ROSE } from '../../utils/tokens';
import { useGetAllUsers, useDeleteUser } from '../../hooks/useUser';
import { toast } from 'react-hot-toast';

export default function AdminUsers() {

    const { data, isLoading, isError, error } = useGetAllUsers();
    const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

    const users = data?.users || [];

    // 2. دالة الحذف
    const handleDelete = (id) => {
        if (!window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;
        
        deleteUser(id, {
            onSuccess: () => toast.success("تم حذف المستخدم بنجاح"),
            onError: (e) => toast.error(e.message || "حدث خطأ أثناء الحذف")
        });
    };

    // 3. حالات التحميل والخطأ
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64 border border-stone-300 bg-white">
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 animate-pulse" style={{ fontFamily: MONO }}>
                    Loading System Users...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 border border-rose-300 bg-rose-50 text-rose-700">
                <p className="text-[13px]" style={{ fontFamily: SANS }}>
                    {error.message || "فشل في جلب البيانات"}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h2 className="text-[32px] font-medium text-stone-900" style={{ fontFamily: DISPLAY }}>System Users.</h2>
            </div>

            <div className="bg-white border border-stone-300">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-stone-50">
                            <th className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-stone-500 border-b border-stone-300 w-24" style={{ fontFamily: MONO }}>ID</th>
                            <th className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-stone-500 border-b border-stone-300" style={{ fontFamily: MONO }}>User Details</th>
                            <th className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-stone-500 border-b border-stone-300 w-32" style={{ fontFamily: MONO }}>Role</th>
                            <th className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-stone-500 border-b border-stone-300 w-32" style={{ fontFamily: MONO }}>Joined</th>
                            <th className="px-4 py-3 border-b border-stone-300 w-24"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                        {users.map((user) => {
                            // تنسيق التاريخ
                            const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'short', day: 'numeric'
                            });

                            return (
                                <tr key={user._id} className="hover:bg-stone-50 transition-colors">
                                    {/* هنا كناخدو آخر 6 ديال الحروف من ID ديال MongoDB */}
                                    <td className="px-4 py-4 text-[11px] text-stone-400" style={{ fontFamily: MONO }}>
                                        #{user._id.slice(-6)}
                                    </td>
                                    <td className="px-4 py-4">
                                        <p className="text-[14px] font-medium text-stone-900" style={{ fontFamily: SANS }}>{user.fullname}</p>
                                        <p className="text-[11px] text-stone-500" style={{ fontFamily: MONO }}>{user.email}</p>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-[10px] uppercase tracking-widest px-2 py-1 border" style={{ fontFamily: MONO, color: user.role === 'admin' ? AMBER : 'inherit', borderColor: user.role === 'admin' ? '#eedfc2' : '#e5e5e5', backgroundColor: user.role === 'admin' ? '#fdf7ec' : 'transparent' }}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-[12px] text-stone-500" style={{ fontFamily: MONO }}>
                                        {joinDate}
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <button 
                                            onClick={() => handleDelete(user._id)}
                                            disabled={isDeleting}
                                            className="text-[10px] uppercase border border-stone-300 px-2 py-1 hover:bg-[--rose] hover:text-white hover:border-[--rose] transition-colors disabled:opacity-50" 
                                            style={{ fontFamily: MONO, '--rose': ROSE }}
                                        >
                                            {isDeleting ? '...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}