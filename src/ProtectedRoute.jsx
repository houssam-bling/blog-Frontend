import { useNavigate } from 'react-router';
import  {useStore} from './store'
import ErrorMessage from './errorPage';


export default function ProtectedRoute({children})
{
    const user = useStore((set)=>set.theUser);

    if(!user) return <ErrorMessage message={"يرجى تسجيل الدخول"}/>
    
    else
    {
        return(
            <div>
                {children}
            </div>
        );
    }
}