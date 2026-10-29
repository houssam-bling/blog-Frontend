import { Link, useNavigate } from "react-router";
import { MONO, DISPLAY, BODY, SANS, CLAY, AMBER, DUSTY } from './tokens';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#fdfbf8] text-stone-800 flex items-center justify-center px-6 py-16">
            <div className="max-w-md w-full">

                {/* Kicker */}
                <div className="flex items-baseline gap-3 mb-6">
                    <span
                        className="text-[10px] uppercase tracking-[0.28em] font-bold"
                        style={{ fontFamily: MONO, color: CLAY }}
                    >Error</span>
                    <span className="h-px flex-1 self-center" style={{ backgroundColor: '#e7e0d6' }} aria-hidden />
                    <span
                        className="text-[10px] uppercase tracking-[0.2em] tabular-nums"
                        style={{ fontFamily: MONO, color: AMBER }}
                    >404</span>
                </div>

                {/* Oversized numeral */}
                <div className="flex items-baseline gap-4 mb-6">
                    <span
                        className="text-[96px] sm:text-[120px] leading-[0.85] font-medium tracking-[-0.04em] text-stone-900 tabular-nums"
                        style={{ fontFamily: DISPLAY }}
                    >404</span>
                    <span
                        className="text-[10px] uppercase tracking-[0.28em] text-stone-400 pb-3"
                        style={{ fontFamily: MONO }}
                    >Not Found</span>
                </div>

                {/* Headline */}
                <h1
                    className="text-[24px] leading-[1.2] font-medium tracking-[-0.01em] text-stone-900 mb-3 text-balance"
                    style={{ fontFamily: DISPLAY }}
                >
                    هذه الصفحة غير موجودة
                </h1>

                {/* Body */}
                <p
                    className="text-[15px] leading-[1.7] text-stone-600 mb-8 max-w-[46ch]"
                    style={{ fontFamily: BODY }}
                >
                    قد يكون الرابط قديماً، أو تم حذف الصفحة، أو أُعيدت تسميتها. لا بأس — لنعد إلى مكان مألوف.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 mb-10">
                    <Link
                        to="/"
                        className="flex-1 text-center bg-stone-800 hover:bg-stone-900 text-white px-5 py-2.5 rounded-lg text-[13px] font-medium no-underline transition-colors"
                        style={{ fontFamily: SANS }}
                    >العودة إلى الرئيسية</Link>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 bg-white border border-stone-200 hover:border-stone-400 hover:bg-stone-50 text-stone-700 px-5 py-2.5 rounded-lg text-[13px] font-medium transition-colors"
                        style={{ fontFamily: SANS }}
                    >الرجوع للخلف</button>
                </div>

                {/* Footer hints */}
                <div className="pt-6 border-t border-stone-200/80">
                    <p
                        className="text-[10px] uppercase tracking-[0.22em] text-stone-400 mb-3"
                        style={{ fontFamily: MONO }}
                    >Maybe you were looking for</p>
                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] border border-stone-200 hover:border-stone-400 hover:bg-white no-underline transition-colors"
                            style={{ fontFamily: MONO, color: DUSTY }}
                        >← Feed</Link>
                        <Link
                            to="/profile"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] border border-stone-200 hover:border-stone-400 hover:bg-white no-underline transition-colors"
                            style={{ fontFamily: MONO, color: DUSTY }}
                        >Profile</Link>
                        <Link
                            to="/signin"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] border border-stone-200 hover:border-stone-400 hover:bg-white no-underline transition-colors"
                            style={{ fontFamily: MONO, color: DUSTY }}
                        >Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}