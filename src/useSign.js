import {useMutation,useQueryClient} from '@tanstack/react-query'
import  {api} from './axios';

const signUp = async function (inputForm)
{
    const response = await api.post("/auth/SignUp",
        {
            fullname:inputForm.fullname,
            email:inputForm.email,
            password:inputForm.password,
            gender:inputForm.gender,
        }
    )
    return response.data;
}
export function useSignUp()
{
    const qc = useQueryClient();
    return useMutation({mutationFn:(inputForm)=>signUp(inputForm),onSuccess:()=>qc.invalidateQueries({queryKey:['accounts']})})
}
const signIn = async function (inputForm)
{
    const response = await api.post("/auth/SignIn",
        {
            email:inputForm.email,
            password:inputForm.password,
        }
    )
    return response.data;
}
export function useSignIn()
{
    return useMutation({mutationFn:(inputForm)=>signIn(inputForm)})
}