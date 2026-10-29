import {useQuery,useMutation,useQueryClient,keepPreviousData} from '@tanstack/react-query'
import {api} from '../services/axios';

const handleLogic = ({postId,userId,posts,action})=>
{
    if (!userId) return posts;
    if(!Array.isArray(posts))
    {
        posts = [posts];
    }
    const hasDislike = posts?.find((post)=>post._id === postId)?.dislikes?.includes(userId) ;
    const hasLike = posts?.find((post)=>post._id === postId)?.likes?.includes(userId);
    

    if(action === "dislike")
    {
        if(hasLike)
        {
            return posts.map((post)=> post._id === postId ? {...post,likes:[...post.likes.filter((user)=>user !== userId)]
                ,dislikes:[...post.dislikes,userId]} : post)
        }
        else
        {
            if(!hasDislike)
            {
                return posts.map((post)=> post._id === postId ? {...post,dislikes:[...post.dislikes,userId]} : post)
            }
            else
            {
                return posts.map((post)=> post._id === postId ? {...post,dislikes:[...post.dislikes.filter((user)=>user !== userId)]} : post)
            }
        }
    }
    if(action === "like")
    {
        if(hasDislike)
        {
            return posts.map((post)=> post._id === postId ? {...post,dislikes:[...post.dislikes.filter((user)=>user !== userId)]
                ,likes:[...post.likes,userId]} : post)
        }
        else
        {
            if(!hasLike)
            {
                return posts.map((post)=> post._id === postId ? {...post,likes:[...post.likes,userId]} : post)
            }
            else
            {
                return posts.map((post)=> post._id === postId ? {...post,likes:[...post.likes.filter((user)=>user !== userId)]} : post)
            }
        }
    }
} 

const getAllPosts = async ({page,limit})=> (await api.get(`/posts/`,{params:{page,limit}})).data;

export const useGetAllPosts = function({page,limit})
{
    return useQuery({queryKey:["Posts",page,limit],queryFn:()=>getAllPosts({page,limit}),placeholderData:keepPreviousData})
}
const getMyPosts = async ()=>(await api.get('/posts/me')).data

export const useGetMyPosts =  ()=> useQuery({queryKey:["Posts","me"],queryFn:getMyPosts});

const getSinglePost = async (id)=> (await api.get(`/posts/${id}`)).data

export const useGetSinglePost = (id)=> useQuery({queryKey:["Posts",id],queryFn:()=>getSinglePost(id)})

const addPost = async (inputForm)=>(await api.post('/posts',inputForm)).data

export const useAddPost = function()
{
    const qc = useQueryClient()
    return useMutation({mutationFn:(inputForm)=>addPost(inputForm),
        onSuccess:()=>
            {
                qc.invalidateQueries({queryKey:["Posts"]})
                qc.invalidateQueries({ queryKey: ["profileStates"] });
                qc.invalidateQueries({ queryKey: ["adminStates"] });
            }} )
}
const likePost = async ({id})=> (await api.patch(`/posts/${id}/Like`)).data

export const useLikePost = function()
{
    const qc = useQueryClient()
    return useMutation({mutationFn:({id})=>likePost({id}),
        onMutate:async({id,userId})=>
        {
            const oldData = qc.getQueriesData({queryKey:['Posts']})
            await qc.cancelQueries({queryKey:["Posts"]});
            qc.setQueriesData({queryKey:["Posts"]},(old)=>{
                if(!old) return
                if(old.Posts) return {...old,Posts:handleLogic({postId:id,userId:userId,posts:old.Posts,action:"like"})}
                if(Array.isArray(old)) return handleLogic({postId:id,userId:userId,posts:old,action:"like"})
                if(old.post) return {...old,post:handleLogic({postId:id,userId:userId,posts:old.post,action:"like"})[0]}
            })
            return {oldData}
        },
        onError:(error,variables,context)=>{

            if (context?.oldData) {
                    context.oldData.forEach(([queryKey, data]) => qc.setQueryData(queryKey, data));
                }
            },
        onSettled: () => qc.invalidateQueries({queryKey:["Posts"]})

    },)
}
const disLikesPost = async ({id})=>(await api.patch(`/posts/${id}/Dislike`)).data

export const useDisLikesPost = function()
{
    const qc = useQueryClient()
    return useMutation({mutationFn:({id})=>disLikesPost({id}),
        onMutate:async({id,userId})=>
        {
            const oldData = qc.getQueriesData({queryKey:['Posts']})
            await qc.cancelQueries({queryKey:["Posts"]});
            qc.setQueriesData({queryKey:["Posts"]},(old)=>{
                if(!old) return
                if(old.Posts) return {...old,Posts:handleLogic({postId:id,userId:userId,posts:old.Posts,action:"dislike"})}
                if(Array.isArray(old)) return handleLogic({postId:id,userId:userId,posts:old,action:"dislike"})
                if(old.post) return {...old,post:handleLogic({postId:id,userId:userId,posts:old.post,action:"dislike"})[0]}
            })
            return {oldData}
        },
        onError:(error,variables,context)=>{

            if (context?.oldData) {
                    context.oldData.forEach(([queryKey, data]) => qc.setQueryData(queryKey, data));
                }
            },
        onSettled: () => qc.invalidateQueries({queryKey:["Posts"]})

    },)
} 


const editPost = async({id,inputForm})=> (await api.patch(`/posts/${id}`,{...inputForm})).data

export const useEditPost = function()
{
    const qc = useQueryClient()
    return useMutation({mutationFn:({id,inputForm})=>editPost({id,inputForm}),onSuccess:()=>{qc.invalidateQueries({queryKey:["Posts"]})}} )
}

const deletePost = async(id)=> (await api.delete(`/posts/${id}`)).data

export const useDeletePost = function()
{
    const qc = useQueryClient()
    return useMutation({mutationFn:(id)=>deletePost(id),
        onSuccess:()=>{
            qc.invalidateQueries({queryKey:["Posts"]})
            qc.invalidateQueries({ queryKey: ["profileStates"] });
            qc.invalidateQueries({ queryKey: ["adminStates"] });
        }} )
}


