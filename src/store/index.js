import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import noteSlice from "./noteSlice";

const persistNoteConfig = {
  key: "note",
  storage,
};


const persistedNoteReducer = persistReducer(persistNoteConfig, noteSlice);

export const store = configureStore({
  reducer: {
    note: persistedNoteReducer,
  },
  devTools: true,
});

export const persistor = persistStore(store);
