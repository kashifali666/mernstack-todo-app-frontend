import React from "react";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const ToDo = ({ text, updateMode, deleteTodo }) => {
  return (
    <div className="todo">
      <div className="text">{text}</div>
      <div className="icons">
        <BiEdit className="icon" onClick={updateMode} />
        <AiFillDelete className="icon" onClick={deleteTodo} />
      </div>
    </div>
  );
};

export default ToDo;

// Overview:

// This component represents each individual to-do item in your app. It displays the to-do text and provides options to either edit or delete the to-do.
