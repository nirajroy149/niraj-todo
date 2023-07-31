import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
// import { FiEdit } from "react-icons/fi";

export default function ToDo({
  id,
  title,
  isCompleted,
  workStatus,
  deletToDo,
  date,
  handleDrag,
  handleTargetId,
}) {
  function handleDragStart() {}
  function handleDragEnd() {
    handleDrag(id);
  }
  function handleDragOver() {
    handleTargetId(id);
  }
  return (
    <div
      className="eachTodo"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragOver}
    >
      <div>
        <input
          type="checkbox"
          id={id}
          name={id}
          onChange={() => workStatus(id)}
          checked={isCompleted}
        />
        <label
          for={id}
          style={{ textDecoration: isCompleted ? "line-through" : "none" }}
        >
          {" "}
          {title}
        </label>
        <br></br>
        {/* <input
          type="checkbox"
          onChange={() => workStatus(id)}
          checked={isCompleted}
        />
        <label  style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
          {title}
        </label> */}
      </div>
      <div>
        <span>{date}</span>
        <AiOutlineDelete onClick={() => deletToDo(id)} />
      </div>
    </div>
  );
}
