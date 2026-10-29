import { useNavigate } from 'react-router';
import  {useStore} from '../store/store'
import ErrorMessage from '../pages/errorPage';


export default function ProtectedRoute({children})
{
    const isLogin = useStore((set)=>set.isLogin);

    if(!isLogin) return <ErrorMessage message={"يرجى تسجيل الدخول"}/>
    
    else
    {
        return(
            <div>
                {children}
            </div>
        );
    }
}