import  {useStore} from '../store/store'
import ErrorMessage from '../pages/errorPage';


export default function ProtectedRoute({children})
{
    const isLoggedIn = useStore((state) => state.isLoggedIn);

    if(!isLoggedIn) return <ErrorMessage message={"يرجى تسجيل الدخول"}/>
    
    else
    {
        return(
            <div>
                {children}
            </div>
        );
    }
}