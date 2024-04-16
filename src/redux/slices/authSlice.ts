import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IUser {
    first_name: string | null;
    second_name: string | null;
    email: string | null;
    avatar_img_url: string | null;
}
interface IUserState {
    user: IUser;
    isLogin: boolean;
}
const initialState: IUserState = {
    user: {
        first_name: null,
        second_name: null,
        email: null,
        avatar_img_url: null,
    },
    isLogin: false,
};        

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onLoginSuccesss: (state, action: PayloadAction<IUser>) => {
            console.log(action.payload);
            const { first_name, second_name, email, avatar_img_url} = action.payload;

            state.user.first_name = first_name;
            state.user.second_name = second_name;
            state.user.email = email;
            state.user.avatar_img_url = avatar_img_url;

            state.isLogin = true;
        },
        onLogOut: () => initialState,
    },

});

export const { onLoginSuccesss, onLogOut } = userSlice.actions;
export default userSlice.reducer;