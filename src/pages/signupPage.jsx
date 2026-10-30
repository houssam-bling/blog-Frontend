import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useSignUp } from '../hooks/useSign'
import { useStore } from '../store/store'
import { toast } from "react-hot-toast";


const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const DISPLAY = "'Newsreader', 'Amiri', 'Noto Naskh Arabic', Georgia, serif";
const SANS = "'Noto Sans Arabic', system-ui, -apple-system, sans-serif";

const CLAY = "#b5714d";
const AMBER = "#c99a4a";

const fieldClass = "w-full bg-white border border-stone-200 rounded-lg px-3.5 py-2.5 text-[14px] text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 transition-colors";

export default function SignUpPage() {
    const { register, handleSubmit } = useForm({
        defaultValues: { fullname: '', email: '', password: "", gender: '', }
    })
    const navigate = useNavigate();
    const { mutate: signUp, isPending: isSigningUp } = useSignUp();
    const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);

    const handleSignUp = (registrationDetails) => {
        signUp(registrationDetails, {
            onSuccess: (authResponse) => {
                toast.success('تم التسجيل بنجاح')
                setIsLoggedIn(true)
                localStorage.setItem('isLogin',true)
                localStorage.setItem('Token', authResponse.token)
                navigate("/")
            },
            onError: (error) => { toast.error(error.message);  setIsLoggedIn(false)}
        })
    }

    return (
        <div className="min-h-screen bg-[#fdfbf8] flex items-center justify-center p-6">
            <div className="w-full max-w-md">

                <div className="bg-white border border-stone-200/80 rounded-2xl p-7 sm:p-9">

                    {/* Kicker */}
                    <div className="flex items-baseline gap-3 mb-6">
                        <span className="text-[10px] uppercase tracking-[0.28em] font-bold" style={{ fontFamily: MONO, color: CLAY }}>Account</span>
                        <span className="h-px flex-1 self-center" style={{ backgroundColor: '#e7e0d6' }} aria-hidden />
                        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: MONO, color: AMBER }}>Register</span>
                    </div>

                    <h1 className="text-[28px] leading-[1.2] font-medium tracking-[-0.01em] text-stone-900 mb-1.5" style={{ fontFamily: DISPLAY }}>
                        إنشاء حساب جديد
                    </h1>
                    <p className="text-[13px] text-stone-500 mb-7" style={{ fontFamily: SANS }}>
                        ابدأ بخطوة صغيرة — سطر واحد في كل مرة.
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>

                        <div>
                            <label className="block text-[11px] text-stone-500 mb-1.5 tracking-wide" style={{ fontFamily: SANS }}>الاسم الكامل</label>
                            <input
                                type="text"
                                {...register('fullname', { required: true })}
                                placeholder="Full Name"
                                className={fieldClass}
                                style={{ fontFamily: SANS }}
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] text-stone-500 mb-1.5 tracking-wide" style={{ fontFamily: SANS }}>البريد الإلكتروني</label>
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                placeholder="name@example.com"
                                className={fieldClass}
                                style={{ fontFamily: SANS }}
                                dir="ltr"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] text-stone-500 mb-1.5 tracking-wide" style={{ fontFamily: SANS }}>كلمة المرور</label>
                            <input
                                {...register('password', { required: true })}
                                type="password"
                                placeholder="••••••••"
                                className={fieldClass}
                                style={{ fontFamily: SANS }}
                                dir="ltr"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] text-stone-500 mb-1.5 tracking-wide" style={{ fontFamily: SANS }}>الجنس</label>
                            <select
                                {...register('gender', { required: true })}
                                className={fieldClass}
                                style={{ fontFamily: SANS }}
                            >
                                <option value="">اختر الجنس</option>
                                <option value="male">ذكر</option>
                                <option value="female">أنثى</option>
                            </select>
                        </div>

                        <button
                            disabled={isSigningUp}
                            type="submit"
                            className="w-full bg-stone-800 hover:bg-stone-900 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-colors text-[13px] mt-3"
                            style={{ fontFamily: SANS }}
                        >
                            {isSigningUp ? 'جاري الانتظار...' : 'إنشاء الحساب'}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-[12px] text-stone-500" style={{ fontFamily: SANS }}>
                    لديك حساب بالفعل؟{' '}
                    <Link to="/signIn" className="font-medium no-underline transition-colors hover:opacity-80" style={{ color: CLAY }}>
                        تسجيل الدخول
                    </Link>
                </p>
            </div>
        </div>
    );
}