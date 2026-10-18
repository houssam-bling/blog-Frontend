import {create} from 'zustand'

export const useStore = create((set)=>({
    addPop:false,
    editeUserPop:false,
    theUser:JSON.parse(localStorage.getItem("CurrentUser")) || null,
    setAddPopTrue:()=>set({addPop:true}),
    setAddPopFalse:()=>set({addPop:false}),

    setediteUserPopFalse:()=>set({editeUserPop:false}),
    setediteUserPopTrue:()=>set({editeUserPop:true}),


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

