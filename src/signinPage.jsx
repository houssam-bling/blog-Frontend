import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import {useSignIn} from './useSign'
import {useStore} from './store'

export default function SignPage() {
    const {register,handleSubmit} = useForm({defaultValues:
        {
            email:'',
            password:'',
        }}
    )
    const {mutate,isPending,} = useSignIn()    
    const setUser = useStore((set)=>set.setUser);

    const navigate = useNavigate();
    const onSubmit = function(input)
    {
        mutate(input,{
            onSuccess:(data)=>
            {
                setUser(data.User)
                localStorage.setItem("Token",data.token)
                navigate("/")
            },
            onError:(e)=>
            {
                console.log(e.message)
            },
        })
    }
    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
            <div className="bg-gray-800 border border-gray-700/80 rounded-2xl p-8 max-w-md w-full shadow-xl">
                <h1 className="text-2xl font-bold mb-6 text-center text-cyan-400">تسجيل الدخول</h1>
                
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">البريد الإلكتروني</label>
                        <input {...register('email',{required:true})}
                            type="email" 
                            placeholder="name@example.com" 
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">كلمة المرور</label>
                        <input {...register('password',{required:true})}
                            type="password" 
                            placeholder="••••••••" 
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                        />
                    </div>

                    <button 
                    disabled = {isPending}
                        type="submit" 
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm mt-2 shadow"
                    >
                       {isPending ? 'جاري  تسجيل الدخول...' :  'تسجيل الدخول'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    <Link to="/" className="text-cyan-400 hover:underline">
                        &larr; العودة إلى الرئيسية
                    </Link>
                </div>
            </div>
        </div>
    );
}