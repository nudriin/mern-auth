import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore.js";


const rootReducer = combineReducers({
    user: userSlice
});

const persistConfig = {
    key: 'login',
    version: 1,
    storage
}

const persist = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persist,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store);

// Set timeout untuk menghapus data dari local storage setelah 1 jam
setTimeout(() => {
    persistor.purge();
}, 60 * 60 * 1000);