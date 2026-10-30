import {useQuery,useMutation,useQueryClient, keepPreviousData} from '@tanstack/react-query'
import  {api} from '../services/axios';
const getPostComments = async function(postId)
{
    const response = await api.get(`/comments/${postId}`)
    return response.data;
}
export const useGetPostComments = function(postId)
{
    return useQuery({queryKey:["Comments",postId],queryFn:()=>getPostComments(postId)})
}
const addPostComments = async function(commentInput)
{
    const response = await api.post(`/comments`,commentInput)
    return response.data;
}
export const useAddPostComments = function()
{
    const queryClient = useQueryClient()
    return useMutation({mutationFn:(commentInput)=>addPostComments(commentInput),onSuccess:(commentResponse)=>
        {
            queryClient.invalidateQueries({queryKey:["Comments",commentResponse?.Comment?.postId]})
            queryClient.invalidateQueries({ queryKey: ["profileStates"] });
            queryClient.invalidateQueries({ queryKey: ["adminStates"] });
        }} )
}
const updateCommentById = async function({ id: commentId, inputForm: commentInput })
{
    const response = await api.patch(`/comments/${commentId}`,{...commentInput})
    return response.data;
}

export const useUpdateCommentById = function()
{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id: commentId, inputForm: commentInput }) => updateCommentById({ id: commentId, inputForm: commentInput }),
        onSuccess: (commentResponse) => {
            queryClient.invalidateQueries({ queryKey: ["Comments", commentResponse?.Comment?.postId] });
        }
    })
}

const deleteCommentById = async function({ id: commentId })
{
    const response = await api.delete(`/comments/${commentId}`)
    return response.data;
}

export const useDeleteCommentById = function()
{
    const queryClient = useQueryClient()
    return useMutation({mutationFn:(commentId)=>deleteCommentById(commentId)
        ,onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["Comments"]})
            queryClient.invalidateQueries({ queryKey: ["profileStates"] });
            queryClient.invalidateQueries({ queryKey: ["adminStates"] });
        }} )
}
const getAllComments = async ({page = 1,limit = 5}) => (await api.get('/comments',{params:{page,limit}})).data;

export const useGetAllComments = ({page,limit}) => {return useQuery({ queryKey: ["Comments", "all",page,limit], queryFn:()=> getAllComments({page,limit}),placeholderData:keepPreviousData });}
