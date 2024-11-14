import { useEffect, useState } from "react";
import ToDo from "./components/ToDo"; // This is a child component responsible for rendering each individual to-do item.
import getAllToDo, {
  addToDo,
  updateToDo,
  deleteToDo,
} from "./utils/HandleApi.js"; // These functions are used to handle API calls (getting, adding, updating, and deleting to-dos).

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsupdating] = useState(false); // This state determines whether the app is currently editing an existing to-do or adding a new one.
  const [toDoId, setToDoId] = useState(""); // This state stores the unique ID of the to-do item that is being updated.

  useEffect(() => {
    //This hook is used to run code when the component first renders
    getAllToDo(setToDo); // This fetches all to-do items from the backend API and updates the toDo state.
  }, []); // The empty array [] ensures this only runs once, when the component loads.

  const updateMode = (_id, text) => {
    // This function is called when a user wants to edit an existing to-do
    setIsupdating(true); // It switches the app to "update mode".
    setText(text); // It sets the current text of the to-do in the input field, allowing the user to edit it.
    setToDoId(_id); // It stores the ID of the to-do being updated, so the correct item can be modified in the database.
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add ToDos.."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="add"
            onClick={
              isUpdating
                ? () =>
                    updateToDo(toDoId, text, setToDo, setText, setIsupdating)
                : () => addToDo(text, setText, setToDo)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteTodo={() => deleteToDo(item._id, setToDo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

// div classname, list, concepts

// toDo.map(): This iterates over the toDo array and renders each to-do item as a ToDo component.
// key={item._id}: Each to-do item needs a unique key to help React identify changes.
// text={item.text}: Passes the text of the to-do to the ToDo component.
// updateMode(): When a to-do is clicked for editing, this function is triggered to switch the app to update mode.
// deleteTodo(): This deletes a to-do item when triggered.
// In simple terms: This loops through the list of to-dos and renders each one. It also includes options for updating and deleting each to-do.
