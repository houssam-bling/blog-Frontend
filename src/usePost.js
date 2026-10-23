import {useQuery,useMutation, useQueryClient,keepPreviousData} from '@tanstack/react-query'
import {api} from './axios';

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
    return useMutation({mutationFn:(inputForm)=>addPost(inputForm),onSuccess:()=>{qc.invalidateQueries({queryKey:["Posts"]})}} )
}
const likePost = async ({id})=> (await api.patch(`/posts/${id}/Like`)).data

export const useLikePost = function()
{
    const qc = useQueryClient()
    return useMutation({mutationFn:({id})=>likePost({id}),onSuccess:()=>{qc.invalidateQueries({queryKey:["Posts"]})}} )
}
const disLikesPost = async ({id})=>(await api.patch(`/posts/${id}/Dislike`)).data

export const useDisLikesPost = function()
{
    const qc = useQueryClient()
    return useMutation({mutationFn:({id})=>disLikesPost({id}),onSuccess:()=>{qc.invalidateQueries({queryKey:["Posts"]})}} )
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
    return useMutation({mutationFn:(id)=>deletePost(id),onSuccess:()=>{qc.invalidateQueries({queryKey:["Posts"]})}} )
}


