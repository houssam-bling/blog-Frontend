export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="w-10 h-10 border-4 border-gray-700 border-t-cyan-400 rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm mt-3">جاري التحميل...</p>
        </div>
    );
}