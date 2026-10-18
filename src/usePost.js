import {useQuery,useMutation, useQueryClient} from '@tanstack/react-query'
import {api} from './axios';

const getAllPosts = async function()
{
    const response = await api.get('/posts/')
    return response.data;
}
export const useGetAllPosts = function()
{
    return useQuery({queryKey:["Posts"],queryFn:getAllPosts})
}
const getMyPosts = async function()
{
    const response = await api.get('/posts/me')
    return response.data;
}
export const useGetMyPosts =  ()=> useQuery({queryKey:["Posts"],queryFn:getMyPosts}).data;
const getSinglePost = async function(id)
{
    const response = await api.get(`/posts/${id}`)
    return response.data;
}
export const useGetSinglePost = function(id)
{
    return useQuery({queryKey:["Posts",id],queryFn:()=>getSinglePost(id)})
}
const addPost = async function(inputForm)
{
    const response = await api.post('/posts',inputForm)
    return response.data;
}
export const useAddPost = function()
{
    const qc = useQueryClient()
    return useMutation({mutationFn:(inputForm)=>addPost(inputForm),onSuccess:()=>{qc.invalidateQueries({queryKey:["Posts"]})}} )
}
const likePost = async function({id})
{
    const response = await api.patch(`/posts/${id}/Like`)
    return response.data;
}
export const useLikePost = function()
{
    const qc = useQueryClient()
    return useMutation({mutationFn:({id})=>likePost({id}),onSuccess:()=>{qc.invalidateQueries({queryKey:["Posts"]})}} )
}
const disLikesPost = async function({id})
{
    const response = await api.patch(`/posts/${id}/Dislike`)
    return response.data;
}
export const useDisLikesPost = function()
{
    const qc = useQueryClient()
    return useMutation({mutationFn:({id})=>disLikesPost({id}),onSuccess:()=>{qc.invalidateQueries({queryKey:["Posts"]})}} )
}