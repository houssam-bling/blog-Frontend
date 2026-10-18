import {useMutation} from '@tanstack/react-query';
import {api} from './axios'
import { useStore } from './store';

const editeUser = async (inputForm)=> (await api.patch('/users/update',{...inputForm})).data;

export const useEditeUser = function()
{
    return useMutation({mutationFn:(inputForm)=>editeUser(inputForm),onSuccess:(data)=>{
        useStore.getState().setUser(data?.user);
    }})
}
