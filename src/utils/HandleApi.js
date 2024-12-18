



import axios from "axios";

const baseUrl = "https://mernstack-todo-app-backend-dqwl.onrender.com"; 

const getAllToDo = (setToDo) => {
  // Purpose: Fetches all to-do items from the backend and updates the frontend state.

  axios.get(baseUrl).then(({ data }) => {
    console.log("data--->", data);
    setToDo(data);
  });
};

const addToDo = (text, setText, setToDo) => {
  // Purpose: Adds a new to-do item to the backend database.
  axios
    .post(`${baseUrl}/save`, { text }) // Sends a POST request to ${baseUrl}/save with the 'new text' of the to-do item in the request body.
    .then((data) => {
      console.log(data); // Logs the returned data to the console and clears the text input field using setText("")
      setText("");
      getAllToDo(setToDo); // Calls getAllToDo(setToDo) to refresh the list of to-dos after the new one has been added.
    })
    .catch((error) => console.log(error));
};

const updateToDo = (toDoId, text, setToDo, setText, setIsupdating) => {
  axios
    .post(`${baseUrl}/update`, { _id: toDoId, text })
    .then((data) => {
      console.log(data);
      setText("");
      setIsupdating(false);
      getAllToDo(setToDo);
    })
    .catch((error) => console.log(error));
};

const deleteToDo = (toDoId, setToDo) => {
  axios
    .post(`${baseUrl}/delete`, { _id: toDoId })
    .then((data) => {
      console.log(data);
      getAllToDo(setToDo);
    })
    .catch((error) => console.log(error));
};

export default getAllToDo;
export { addToDo };
export { updateToDo };
export { deleteToDo };
