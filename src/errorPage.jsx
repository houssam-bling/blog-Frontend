export default function ErrorMessage({ message = "حدث خطأ غير متوقع أثناء جلب البيانات."}) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-800 border border-red-500/30 rounded-2xl shadow-lg max-w-md mx-auto my-8">
            {/* أيقونة الخطأ */}
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>

            {/* العنوان والرسالة */}
            <h3 className="text-lg font-semibold text-white mb-1">عذراً، حدث خطأ!</h3>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">{message}</p>
        </div>
    );
}