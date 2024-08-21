import { createSlice } from "@reduxjs/toolkit";
const intinitalState={
    loginUser:[],
    token:localStorage.getItem("zoom_token")?JSON.parse(localStorage.getItem("zoom_token")):"",
    dropdownshow:false
}
const Login_Reducer=createSlice({
    name:"Login",
    initialState:intinitalState,
    reducers:{
        LoginUserAction:(state,action)=>{
            localStorage.setItem("zoom_token",JSON.stringify(action?.payload))
        },
        LoginUserData:(state,action)=>{
            state.loginUser.push(action.payload);
        },
        DropdownShow:(state,action)=>{
            state.dropdownshow=action.payload
        },
        LogoutUser:(state,action)=>{
            localStorage.clear();
            localStorage.removeItem("zoom_token");
        }
    }
})
export const {LoginUserAction,LoginUserData,LogoutUser,DropdownShow}=Login_Reducer.actions;
export default Login_Reducer.reducer;