import {createSlice} from "@reduxjs/toolkit"; // import create Slice untuk membuat slice
// Menginisiasikan statenya
const initialState = {
    token : null,
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
        signInStart: (state) => {
            state.loading = true
        },

        //! data(response) yang ada pada sign in akan kita tambahkan ke reducers sebagai action
        signInSuccess: (state, action) => {
            // state.currentUser = action.payload; // * data state token nya akan di simpan di inisialisasikan ke state
            state.token = action.payload
            state.loading = false;
            state.errors = false;
        },
        signInFailed: (state, action) => {
            state.loading = false,
            state.errors = action?.payload // errorny akan diambil dari data responsenya
        }
    }
});

// destructuring dan export datanya dari slicer actions
export const {signInStart, signInSuccess, signInFailed} = userSlice.actions;

//! ini akan kita tambah ke reducer yang ada di store
// ibaratnya userSlice ini adalah komponen yang akan di tambah ke main file yang ada di store 
export default userSlice.reducer; //! mengeksport reducer dari userSlice
