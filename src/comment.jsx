import { MONO, SANS, BODY, CLAY } from './tokens';

export default function Comment({ comment }) {
    const initials = (comment?.author?.fullname || "؟")
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
        <li className="py-5">
            <div className="flex items-start gap-3">
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0 border"
                    style={{ fontFamily: MONO, color: CLAY, borderColor: '#e8dcd0', backgroundColor: '#faf5ee' }}
                    aria-hidden
                >{initials}</div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1.5">
                        <p className="text-[13px] font-medium text-stone-800 truncate" style={{ fontFamily: SANS }}>
                            {comment?.author?.fullname || "مجهول"}
                        </p>
                        <span className="text-[10px] text-stone-300 shrink-0" aria-hidden>·</span>
                        <p className="text-[10px] text-stone-400 shrink-0 tabular-nums" style={{ fontFamily: MONO }}>
                            {date}
                        </p>
                    </div>
                    <p
                        className="text-[15px] leading-[1.7] text-stone-700 whitespace-pre-line wrap-anywhere"
                        style={{ fontFamily: BODY }}
                    >
                        {comment?.commentText}
                    </p>
                </div>
            </div>
        </li>
    );
}