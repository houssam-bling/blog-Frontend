import {useMutation,useQueryClient} from '@tanstack/react-query'
import  {api} from '../services/axios';

const signUp = async function (registrationDetails)
{
    const response = await api.post("/auth/SignUp",
        {
            fullname:registrationDetails.fullname,
            email:registrationDetails.email,
            password:registrationDetails.password,
            gender:registrationDetails.gender,
        }
    )
    return response.data;
}
export function useSignUp()
{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (registrationDetails) => signUp(registrationDetails),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] })
    })
}
const signIn = async function (credentials)
{
    const response = await api.post("/auth/SignIn",
        {
            email:credentials.email,
            password:credentials.password,
        }
    )
    return response.data;
}
export function useSignIn()
{
    return useMutation({ mutationFn: (credentials) => signIn(credentials) })
}

const logout = async () => (await api.post('/auth/LogOut')).data;

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({ mutationFn: logout, onSuccess: () => queryClient.clear() });
}

