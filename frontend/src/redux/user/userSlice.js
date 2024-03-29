import {createSlice} from "@reduxjs/toolkit"; // import create Slice untuk membuat slice
// Menginisiasikan statenya
const initialState = {
    token : null,
    curUser : null,
    loading : false,
    errors : false
}

// ! Membuat slicer untuk userr
const userSlice = createSlice({
    name : 'user',
    // ! membuat inisial statenya atau state awalnya berupa object
    initialState,
    //! reducer digunakan untuk mengubah statenya
    reducers: {
        //! ketika sign in mulai di tekan maka state loading akan di set ke true
        buttonStart : (state) => {
            state.loading=true;
        },

        buttonFinish : (state) => {
            state.loading=false;
            state.errors=false;
        },

        buttonFailed : (state, action) => {
            state.loading=false;
            state.errors=action.payload;
        },

        signInStart: (state) => {
            state.loading = true
        },

        //! data(response) yang ada pada sign in akan kita tambahkan ke reducers sebagai action
        signInSuccess: (state, action) => {
            state.token = action?.payload
            state.loading = false;
            state.errors = false;
        },
        
        signUpSuccess : (state) => {
            state.loading = false;
            state.errors = false;
        },

        getUserSuccess: (state, action) => {
            // * data state token nya akan di simpan di inisialisasikan ke state
            state.curUser = action?.payload
        },

        signInFailed: (state, action) => {
            state.loading = false,
            state.errors = action?.payload // errorny akan diambil dari data responsenya
        },

        updateUserStart: (state) => {
            state.loading;
        },

        updateUserSuccess: (state, action) => {
            state.loading = false;
            state.errors = false;
            state.curUser = action.payload;
        },

        updateUserFailed: (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        }
    }
});

// destructuring dan export datanya dari slicer actions
export const {signInStart, signInSuccess, signInFailed, getUserSuccess, buttonStart, buttonFinish, buttonFailed, signUpSuccess, updateUserSuccess, updateUserStart, updateUserFailed } = userSlice.actions;

//! ini akan kita tambah ke reducer yang ada di store
// ibaratnya userSlice ini adalah komponen yang akan di tambah ke main file yang ada di store 
export default userSlice.reducer; //! mengeksport reducer dari userSlice
