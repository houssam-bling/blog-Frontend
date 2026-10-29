import { useQuery } from "@tanstack/react-query";
import { api } from "../services/axios";

const getProfileStates = async ()=> (await api.get('/state/profile')).data;

export const useGetProfileStates = ()=>useQuery({queryFn:getProfileStates,queryKey:['profileStates'],refetchOnMount:true})

const getAdminStates = async ()=> (await api.get('/state/admin')).data;

export const useGetAdminStates = ()=>useQuery({queryFn:getAdminStates,queryKey:['adminStates']})