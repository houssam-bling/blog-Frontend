import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import {api} from '../services/axios'
import {useStore} from '../store/store'

const editeUser = async (inputForm)=> (await api.patch('/users/update',{...inputForm})).data;

export const useEditeUser = function()
{
    const qc = useQueryClient(); 
    return useMutation({
        mutationFn: (inputForm) => editeUser(inputForm),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] })
    });
};
const deleteUser = async (id)=> (await api.delete(`/users/${id}`)).data;

export const useDeleteUser = function()
{
    const qc = useQueryClient(); 
    return useMutation({
        mutationFn: (id) => deleteUser(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] })
    });
};
const getProfile = async ()=> (await api.get('/users/me')).data;

export const useGetProfile = ()=> {
    const isLogin = useStore((s) => s.isLogin);
    return useQuery({queryKey: ['profile'],queryFn: getProfile,retry:false,enabled:!!isLogin})
}
const getAllUsers = async ()=> (await api.get('/users/all')).data;

export const useGetAllUsers =  ()=> useQuery({queryKey:["users"],queryFn:getAllUsers});


