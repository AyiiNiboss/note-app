import { createSlice } from "@reduxjs/toolkit";
import { createNote, deleteNote } from "../services/notes.service";

const initialState = {
  value: [],
  valueSearch: [],
  search: '',
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    getNote: (state, action) => {
      state.value = action.payload;
    },
    addNote: (state, action) => {
      const token = localStorage.getItem("token");
      createNote(action.payload, token, (res) => {});
    },
    deleteNotes: (state, action) => {
      const filterNotes = state.value.filter((item) => item.slug !== action.payload);
      state.value = filterNotes;
    },
    searchNote: (state, action) => {
      state.search = action.payload
      const filterNotes = state.value.filter((item) => item.title.toLowerCase().includes(state.search.toLowerCase()));
      state.valueSearch = filterNotes
    },
    deleteSearch: (state) => {
      state.search = ''
      state.valueSearch = []
    },
    updatePinnedNote: (state, action) => {
      const findNote = state.value.find((item) => item.slug === action.payload);
      if (findNote) {
        findNote.is_pinned = 1;
      }
    }
  },
});

export const { addNote, getNote, deleteNotes, searchNote, deleteSearch, updatePinnedNote } = noteSlice.actions;
export default noteSlice.reducer;
