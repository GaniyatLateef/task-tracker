import axios from "axios";

const SERVER_BASE_URL = "http://localhost:8080/api/v1";


export const postTask = (taskDetails) => {
    return axios.post(`${SERVER_BASE_URL}/tasks`, taskDetails, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  export const getAllTasks =() => {
    return axios.get(`${SERVER_BASE_URL}/tasks`, {
      headers: {
        Accept: "application/json",
        App: "My galatex app"
      }

  });
}