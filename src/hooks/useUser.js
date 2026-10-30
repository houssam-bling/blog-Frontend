import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import {api} from '../services/axios'
import {useStore} from '../store/store'

const updateUser = async (userUpdates) => (await api.patch('/users/update', { ...userUpdates })).data;

export const useUpdateUser = function()
{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userUpdates) => updateUser(userUpdates),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] })
    });
};
const deleteUser = async (userId) => (await api.delete(`/users/${userId}`)).data;

export const useDeleteUser = function()
{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId) => deleteUser(userId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
    });
};
const getProfile = async ()=> (await api.get('/users/me')).data;

export const useGetProfile = ()=> {
    const isLoggedIn = useStore((state) => state.isLoggedIn);
    return useQuery({queryKey: ['profile'],queryFn: getProfile,retry:false,enabled:!!isLoggedIn})
}
const getAllUsers = async ()=> (await api.get('/users/all')).data;

export const useGetAllUsers =  ()=> useQuery({queryKey:["users"],queryFn:getAllUsers});
