export default function Comment({ comment })
{
    const initials = (comment?.author?.name || "؟")
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const date = new Date(comment?.createdAt).toLocaleDateString("ar-EG", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="px-6 py-4 hover:bg-slate-700/20 transition-colors">
            <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {initials}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <p className="text-white text-sm font-semibold">
                            {comment?.author?.fullname || "مجهول"}
                        </p>
                        <span className="text-slate-500 text-xs">•</span>
                        <p className="text-slate-500 text-xs">{date}</p>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed wrap-break-word">
                        {comment?.commentText}
                    </p>
                </div>
            </div>
        </div>
    );

}