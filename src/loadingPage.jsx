import { MONO } from './tokens';

export default function Loading() {
    return (
        <div className="min-h-[30vh] flex flex-col items-center justify-center gap-4 py-12">
            <div className="w-32 h-px bg-[#e7e0d6] relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1/3 bg-stone-800 animate-[slide_1.4s_ease-in-out_infinite]" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-stone-400" style={{ fontFamily: MONO }}>
                Loading
            </p>
            <style>{`
                @keyframes slide {
                    0%   { transform: translateX(-100%); }
                    100% { transform: translateX(400%); }
                }
            `}</style>
        </div>
    );
}