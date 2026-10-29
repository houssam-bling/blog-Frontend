import ErrorMessage from '../pages/errorPage';
import { useGetProfile } from '../hooks/useUser';
import LoadingPage from '../pages/loadingPage'

export default function ProtectedRoute({children})
{
    const {data,isLoading,isError} = useGetProfile();

    if(isLoading) return <LoadingPage/>
    if(isError) return <ErrorMessage/>

    if(!data || data?.user.role !== "admin") return  <ErrorMessage message={"غير مصرح"}/>
    else
    {
        return(
            <div>
                {children}
            </div>
        );
    }
}