import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
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
    return useMutation({mutationFn:(inputForm)=>addPostComments(inputForm),onSuccess:(data)=>{qc.invalidateQueries({queryKey:["Comments",data?.Comment?.postId]})}} )
}

