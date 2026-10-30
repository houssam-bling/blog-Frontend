import ErrorMessage from '../pages/errorPage';
import { useGetProfile } from '../hooks/useUser';
import LoadingPage from '../pages/loadingPage'

export default function AdminProtectedRouter({ children })
{
    const {
        data: profile,
        isLoading: isProfileLoading,
        isError: isProfileError
    } = useGetProfile();

    if(isProfileLoading) return <LoadingPage/>
    if(isProfileError) return <ErrorMessage/>

    if(!profile || profile.user?.role !== "admin") return <ErrorMessage message={"غير مصرح"}/>
    else
    {
        return(
            <div>
                {children}
            </div>
        );
    }
}