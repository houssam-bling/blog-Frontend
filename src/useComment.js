import {useQuery,useMutation,useQueryClient, keepPreviousData} from '@tanstack/react-query'
import  {api} from './axios';
const getPostComments = async function(id)
{
    const response = await api.get(`/comments/${id}`)
    return response.data;
}
export const useGetPostComments = function(id)
{
    return useQuery({queryKey:["Comments",id],queryFn:()=>getPostComments(id)})
}
const addPostComments = async function(inputForm)
{
    const response = await api.post(`/comments`,inputForm)
    return response.data;
}
export const useAddPostComments = function()
{
    const qc = useQueryClient()
    return useMutation({mutationFn:(inputForm)=>addPostComments(inputForm),onSuccess:(data)=>
        {
            qc.invalidateQueries({queryKey:["Comments",data?.Comment?.postId]})
            qc.invalidateQueries({ queryKey: ["profileStates"] });
            qc.invalidateQueries({ queryKey: ["adminStates"] });
        }} )
}
const updateCommentById = async function({id,inputForm})
{
    const response = await api.patch(`/comments/${id}`,{...inputForm})
    return response.data;
}

export const useUpdateCommentById = function()
{
    const qc = useQueryClient()
    return useMutation({mutationFn:({id,inputForm})=>updateCommentById({id,inputForm}),onSuccess:(data)=>{qc.invalidateQueries({queryKey:["Comments",data?.Comment?.postId]})}} )
}

const deleteCommentById = async function({id})
{
    const response = await api.delete(`/comments/${id}`)
    return response.data;
}

export const useDeleteCommentById = function()
{
    const qc = useQueryClient()
    return useMutation({mutationFn:(id)=>deleteCommentById(id)
        ,onSuccess:(data)=>{
            qc.invalidateQueries({queryKey:["Comments"]})
            qc.invalidateQueries({ queryKey: ["profileStates"] });
            qc.invalidateQueries({ queryKey: ["adminStates"] });
        }} )
}
const getAllComments = async ({page = 1,limit = 5}) => (await api.get('/comments',{params:{page,limit}})).data;

export const useGetAllComments = ({page,limit}) => {return useQuery({ queryKey: ["Comments", "all",page,limit], queryFn:()=> getAllComments({page,limit}),placeholderData:keepPreviousData });}

