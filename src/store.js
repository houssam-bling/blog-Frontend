import {create} from 'zustand'

export const useStore = create((set)=>({
    addPop:false,
    editeUserPop:false,
    PopMode:'add',
    thePost:null,
    theUser: JSON.parse(localStorage.getItem("CurrentUser")) || null  ,
    setAddPopTrue:()=>set({addPop:true}),
    setAddPopFalse:()=>set({addPop:false}),

    setediteUserPopFalse:()=>set({editeUserPop:false}),
    setediteUserPopTrue:()=>set({editeUserPop:true}),

    setPopMode:(mode)=>set({PopMode:mode}),

    setThePost:(post)=>set({thePost:post}),
    setthePostNull:()=>set({thePost:null}),


    setUser:(user)=>{
        localStorage.setItem('CurrentUser',JSON.stringify(user))
        set({theUser:user})
    },
    logout:()=>{
        localStorage.removeItem('CurrentUser');
        localStorage.removeItem('Token');


        set({theUser:null})
    }


    

}))

