import { Link } from "react-router";
import {useGetAllPosts} from './usePost'
import LoadingPage from "./loadingPage";
import ErrorPage from "./errorPage";
import Post from "./post";

export default function HomePage() 
{
    const {data,isLoading,isError,error} = useGetAllPosts()

    if(isLoading) {return <LoadingPage/>}
    if(isError) {return <ErrorPage message={error.message}/>}
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-cyan-400">الصفحة الرئيسية</h1>
                
                <div className="space-y-4">
                    {data?.length === 0 ? "لا يوجد منشورات" : data?.map((post)=> <Post key={post._id} post={post} />)}
                </div>
            </div>
        </div>
    );
}