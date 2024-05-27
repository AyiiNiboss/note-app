import axios from "axios";

export const login = (data, callback) => {
  axios
    .post("http://127.0.0.1:8000/api/login", data)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      callback(error);
    });
};

export const register = (data, callback) => {
  axios
    .post("http://127.0.0.1:8000/api/registers", data)
    .then((response) => {
      callback(true, response.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};
