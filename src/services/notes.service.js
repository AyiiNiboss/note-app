import axios from "axios";

export const createNote = (data, token, callback) => {
  axios
    .post("http://127.0.0.1:8000/api/create-note", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      callback(error);
    });
};

export const getNotes = (token, callback) => {
  axios
    .get("http://127.0.0.1:8000/api/notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      callback(error);
    });
};

export const getDetailNotes = (slug, token, callback) => {
  axios
    .get(`http://127.0.0.1:8000/api/notes/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      callback(error);
    });
};

export const updateNote = (slug, data, token, callback) => {
  axios
    .put(`http://127.0.0.1:8000/api/update-note/${slug}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      callback(error);
    });
};

export const deleteNote = (slug, token, callback) => {
  axios
    .delete(`http://127.0.0.1:8000/api/delete-note/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      callback(error);
    });
}

export const createPinnedNote = (slug, token, callback) => {
  axios
    .get(`http://127.0.0.1:8000/api/update-pinned/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      callback(error);
    });
}