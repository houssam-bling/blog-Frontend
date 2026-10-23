import { MONO, DISPLAY, SANS, ROSE, AMBER } from './tokens';

export default function ErrorMessage({ message = "حدث خطأ غير متوقع أثناء جلب البيانات." }) {
    return (
        <div className="min-h-[40vh] flex items-center justify-center px-6 py-12">
            <div className="max-w-md w-full bg-white border border-stone-200/80 rounded-2xl p-8 text-center">

                <div className="flex items-baseline gap-3 mb-5">
                    <span className="text-[10px] uppercase tracking-[0.28em] font-bold" style={{ fontFamily: MONO, color: ROSE }}>Error</span>
                    <span className="h-px flex-1 self-center" style={{ backgroundColor: '#e7e0d6' }} aria-hidden />
                    <span className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: MONO, color: AMBER }}>Notice</span>
                </div>

                <div
                    className="w-10 h-10 mx-auto mb-4 rounded-full flex items-center justify-center border"
                    style={{ color: ROSE, borderColor: '#f0dada', backgroundColor: '#fbf1ee' }}
                    aria-hidden
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <h3 className="text-[18px] font-medium text-stone-900 mb-1.5" style={{ fontFamily: DISPLAY }}>
                    عذراً، حدث خطأ
                </h3>
                <p className="text-[13px] text-stone-600 leading-relaxed" style={{ fontFamily: SANS }}>
                    {message}
                </p>
            </div>
        </div>
    );
}