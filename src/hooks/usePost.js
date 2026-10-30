import {useQuery,useMutation,useQueryClient,keepPreviousData} from '@tanstack/react-query'
import {api} from '../services/axios';

export const handleLogic = ({postId,userId,posts,action})=>
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
            return posts.map((post)=> post._id === postId ? {...post,likes:[...post.likes.filter((likedUserId)=>likedUserId !== userId)]
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
                return posts.map((post)=> post._id === postId ? {...post,dislikes:[...post.dislikes.filter((dislikedUserId)=>dislikedUserId !== userId)]} : post)
            }
        }
    }
    if(action === "like")
    {
        if(hasDislike)
        {
            return posts.map((post)=> post._id === postId ? {...post,dislikes:[...post.dislikes.filter((dislikedUserId)=>dislikedUserId !== userId)]
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
                return posts.map((post)=> post._id === postId ? {...post,likes:[...post.likes.filter((likedUserId)=>likedUserId !== userId)]} : post)
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

const getSinglePost = async (postId) => (await api.get(`/posts/${postId}`)).data

export const useGetSinglePost = (postId) => useQuery({queryKey:["Posts",postId],queryFn:()=>getSinglePost(postId)})

const addPost = async (postInput) => (await api.post('/posts', postInput)).data

export const useAddPost = function()
{
    const queryClient = useQueryClient()
    return useMutation({mutationFn:(postInput)=>addPost(postInput),
        onSuccess:()=>
            {
                queryClient.invalidateQueries({queryKey:["Posts"]})
                queryClient.invalidateQueries({ queryKey: ["profileStates"] });
                queryClient.invalidateQueries({ queryKey: ["adminStates"] });
            }} )
}
const likePostRequest = async ({ id: postId }) => (await api.patch(`/posts/${postId}/Like`)).data

export const useLikePost = function()
{
    const queryClient = useQueryClient()
    return useMutation({mutationFn:({ id: postId })=>likePostRequest({ id: postId }),
        onMutate:async({ id: postId, userId })=>
        {
            const previousQueries = queryClient.getQueriesData({queryKey:['Posts']})
            await queryClient.cancelQueries({queryKey:["Posts"]});
            queryClient.setQueriesData({queryKey:["Posts"]},(cachedData)=>{
                if(!cachedData) return
                if(cachedData.Posts) return {...cachedData,Posts:handleLogic({postId,userId,posts:cachedData.Posts,action:"like"})}
                if(Array.isArray(cachedData)) return handleLogic({postId,userId,posts:cachedData,action:"like"})
                if(cachedData.post) return {...cachedData,post:handleLogic({postId,userId,posts:cachedData.post,action:"like"})[0]}
            })
            return { previousQueries }
        },
        onError:(error,mutationVariables,context)=>{

            if (context?.previousQueries) {
                    context.previousQueries.forEach(([queryKey, cachedData]) => queryClient.setQueryData(queryKey, cachedData));
                }
            },
        onSettled: () => queryClient.invalidateQueries({queryKey:["Posts"]})

    },)
}
const dislikePostRequest = async ({ id: postId }) => (await api.patch(`/posts/${postId}/Dislike`)).data

export const useDislikePost = function()
{
    const queryClient = useQueryClient()
    return useMutation({mutationFn:({ id: postId })=>dislikePostRequest({ id: postId }),
        onMutate:async({ id: postId, userId })=>
        {
            const previousQueries = queryClient.getQueriesData({queryKey:['Posts']})
            await queryClient.cancelQueries({queryKey:["Posts"]});
            queryClient.setQueriesData({queryKey:["Posts"]},(cachedData)=>{
                if(!cachedData) return
                if(cachedData.Posts) return {...cachedData,Posts:handleLogic({postId,userId,posts:cachedData.Posts,action:"dislike"})}
                if(Array.isArray(cachedData)) return handleLogic({postId,userId,posts:cachedData,action:"dislike"})
                if(cachedData.post) return {...cachedData,post:handleLogic({postId,userId,posts:cachedData.post,action:"dislike"})[0]}
            })
            return { previousQueries }
        },
        onError:(error,mutationVariables,context)=>{

            if (context?.previousQueries) {
                    context.previousQueries.forEach(([queryKey, cachedData]) => queryClient.setQueryData(queryKey, cachedData));
                }
            },
        onSettled: () => queryClient.invalidateQueries({queryKey:["Posts"]})

    },)
} 


const editPost = async({ id: postId, inputForm: postUpdates }) =>
    (await api.patch(`/posts/${postId}`, { ...postUpdates })).data

export const useEditPost = function()
{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id: postId, inputForm: postUpdates }) => editPost({ id: postId, inputForm: postUpdates }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Posts"] })
    })
}

const deletePost = async(postId) => (await api.delete(`/posts/${postId}`)).data

export const useDeletePost = function()
{
    const queryClient = useQueryClient()
    return useMutation({mutationFn:(postId)=>deletePost(postId),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["Posts"]})
            queryClient.invalidateQueries({ queryKey: ["profileStates"] });
            queryClient.invalidateQueries({ queryKey: ["adminStates"] });
        }} )
}
