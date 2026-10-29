import {create} from 'zustand'

export const useStore = create((set)=>({
    addPop:false,
    editeUserPop:false,
    PopMode:'add',
    thePost:null,
    isLogin: localStorage.getItem('isLogin') === "true",
    setAddPopTrue:()=>set({addPop:true}),
    setAddPopFalse:()=>set({addPop:false}),

    setIsLogin :(status)=>set({isLogin:status}),

    setediteUserPopFalse:()=>set({editeUserPop:false}),
    setediteUserPopTrue:()=>set({editeUserPop:true}),

    setPopMode:(mode)=>set({PopMode:mode}),

    setThePost:(post)=>set({thePost:post}),
    setthePostNull:()=>set({thePost:null}),


    logout:()=>{
        localStorage.removeItem('Token');
        localStorage.removeItem('isLogin')
    }
}))

